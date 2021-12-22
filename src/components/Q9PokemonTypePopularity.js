import React from 'react';
import * as sql from '../SqlApi';
import SqlResultTable from './SqlResultTable';
import { Button } from 'react-bootstrap';
import QueryOptionsDropdown from './QueryOptionsDropdown';

export default class Q9PokemonTypePopularity extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            generation: 1,
            result: null
        }
    }

    runQuery() {
        const result = sql.exec(
            `select t.name "Pokemon", count(*) "Number of Pokemon Introduced" from pokemon p
            left join pokemon_species ps on p.species_id = ps.id
            left join generations g on ps.generation_id = g.id
            left join pokemon_types pt on p.id = pt.pokemon_id
            left join types t on pt.type_id = t.id
            where ps.generation_id = ${this.state.generation}
            and p.id < 10000
            group by t.id
            order by "Number of Pokemon Introduced" desc;`)[0];
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
                    <span>Show the number of Pokemon of each type introduced in </span> 
                    <QueryOptionsDropdown 
                        onChange={(x) => {this.setState({generation: x})}} 
                        query="select id, name from generations;"/> 
                    <span>.</span>

                    <p className='italics'>In situations where Pokemon typings have changed (ex. Fairy type), the newest type data is used. Forms (Megas, Alolan, Galarian, etc) are excluded.</p>
                    
                    <Button size="sm" onClick={() => {this.runQuery()}}>Query</Button>
                </div>
                <hr/>
                {table}
            </div>
        );
    }
}