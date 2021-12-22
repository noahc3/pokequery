import React from 'react';
import * as sql from '../SqlApi';
import SqlResultTable from './SqlResultTable';
import { Button } from 'react-bootstrap';
import QueryOptionsDropdown from './QueryOptionsDropdown';

export default class Q8MultiGenerationPokemonLookup extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            generation: 1,
            result: null
        }
    }

    runQuery() {
        const result = sql.exec(
            `select name "Pokemon", group_concat(gid, ", ") "Also Available in Generations" from
            (select distinct p.id "pid", g.id "gid", ps.name "name" from encounters e
            left join pokemon p on e.pokemon_id = p.id
            left join pokemon_species ps on p.species_id = ps.id
            left join versions v on e.version_id = v.id
            left join version_groups vg on v.version_group_id = vg.id
            left join generations g on vg.generation_id = g.id
            where ps.generation_id = ${this.state.generation}
            except
                select distinct p2.id "pid", ps2.generation_id "gid", ps2.name "name" from pokemon p2
                left join pokemon_species ps2 on p2.species_id = ps2.id)
            group by pid
            order by pid;`)[0];
        this.setState({result: result});  
    }

    render() { 
        const result = this.state.result;
        let table;

        if (result) {
            table = (<SqlResultTable rows={result.values} cols={result.columns}/>);
        } else if (result === undefined) {
            table = (<div className="sql-result-table"><p>Got 0 results.</p></div>);
        } else {
            table = (<div className="sql-result-table"><p>Results will appear here.</p></div>);
        }

        return (
            <div>
                <div className='inline-query-span'>
                    <span>Show which other generations Pokemon from </span> 
                    <QueryOptionsDropdown 
                        onChange={(x) => {this.setState({generation: x})}} 
                        query="select id, name from generations g where g.id < 6;"/> 
                    <span> can be naturally obtained in.</span>

                    <p className='italics'>In this context, "naturally obtained" means can be encountered in the game without trading or special events. Some special locations are excluded (ex. Mirage Island). Data from Generation 7+ is not included.</p>
                    
                    <Button size="sm" onClick={() => {this.runQuery()}}>Query</Button>
                </div>
                <hr/>
                {table}
            </div>
        );
    }
}