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
            `select distinct pokedex_number "Dex Number", name Name, genus Genus, generation_id Gen 
            from pokemon pkmn 
            left outer join pokemon_species ps on pkmn.species_id = ps.id 
            left outer join pokemon_dex_numbers pdn on ps.id = pdn.species_id 
            where pdn.pokedex_id = ${this.state.pokedex} order by "Dex Number";`)[0];
        this.setState({result: result});  
    }

    render() {
        const result = this.state.result;
        const table = result ? (<SqlResultTable rows={result.values} cols={result.columns}/>) : (<div className="sql-result-table"><p>Results will appear here.</p></div>);

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