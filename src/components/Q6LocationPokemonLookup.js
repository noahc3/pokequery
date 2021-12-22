import React from 'react';
import * as sql from '../SqlApi';
import SqlResultTable from './SqlResultTable';
import { Button } from 'react-bootstrap';
import QueryOptionsDropdown from './QueryOptionsDropdown';
import NudOption from './NudOption';

export default class Q6LocationPokemonLookup extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            version: 1,
            location: 1,
            result: null
        }
    }

    runQuery() {
        const result = sql.exec(
            `select ps.name "Pokemon", types "Types", l.name "Location", min(e.min_level) "Min Level", max(e.max_level) "Max Level" from encounters e
            left join (
                select p.id id, ps.name name, group_concat(t.name, ", ") types from pokemon p
                left join pokemon_species ps on p.species_id = ps.id
                left join pokemon_types pt on p.id = pt.pokemon_id
                left join types t on pt.type_id = t.id
                group by p.id
                ) ps on e.pokemon_id = ps.id
            left join location_areas la on e.location_area_id = la.id
            left join locations l on la.location_id = l.id
            where e.version_id = ${this.state.version}
            and l.id = ${this.state.location}
            group by e.pokemon_id, la.location_id
            order by la.id;`)[0];
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
                    <span>Show which Pokemon can be obtained in Pokemon </span> 
                    <QueryOptionsDropdown 
                        onChange={(x) => {this.setState({version: x, location: 1})}} 
                        query="select id, name from versions v where v.id in (select e.version_id from encounters e);"/> 
                    <span> at </span>
                    <QueryOptionsDropdown 
                        key={"q6-location-dropdown-pkmn-" + this.state.version}
                        onChange={(x) => {this.setState({location: x})}} 
                        query={`select distinct l.id, l.name from encounters e left join location_areas la on e.location_area_id = la.id left join locations l on la.location_id = l.id where e.version_id = ${this.state.version};`}/> 
                    <span>.</span>

                    <Button size="sm" onClick={() => {this.runQuery()}}>Query</Button>
                </div>
                <hr/>
                {table}
            </div>
        );
    }
}