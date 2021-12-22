import React from 'react';
import * as sql from '../SqlApi';
import SqlResultTable from './SqlResultTable';
import { Button } from 'react-bootstrap';
import QueryOptionsDropdown from './QueryOptionsDropdown';

export default class Q1PokedexLookup extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            pokedex: 1,
            result: null
        }
    }

    runQuery() {
        console.log(this.state.pokedex);
        const result = sql.exec(
            `select distinct pokedex_number "Dex Number", ps.name Name, genus Genus, group_concat(t.name, "; ") "Types", ps.generation_id Gen
            from pokemon p
            left join pokemon_species ps on p.species_id = ps.id
            left join pokemon_dex_numbers pdn on ps.id = pdn.species_id
            left join pokemon_types pt on p.id = pt.pokemon_id
            left join types t on pt.type_id = t.id
            where pdn.pokedex_id = ${this.state.pokedex}
            group by p.id
            order by pokedex_number;`)[0];
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
                    <span>Show all Pokemon in the</span> 
                    <QueryOptionsDropdown 
                        onChange={(x) => {this.setState({pokedex: x})}} 
                        query="select id, name from pokedexes;"/> 
                    <span>Pokedex.</span>

                    <Button size="sm" onClick={() => {this.runQuery()}}>Query</Button>
                </div>
                <hr/>
                {table}
            </div>
        );
    }
}