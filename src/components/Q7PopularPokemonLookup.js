import React from 'react';
import * as sql from '../SqlApi';
import SqlResultTable from './SqlResultTable';
import { Button } from 'react-bootstrap';
import QueryOptionsDropdown from './QueryOptionsDropdown';

export default class Q7PopularPokemonLookup extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            version: 1,
            result: null
        }
    }

    runQuery() {
        const result = sql.exec(
            `select ps.name, count(*) "Possible Locations" from pokemon p
            left join (
                select distinct e2.pokemon_id "pid", e2.location_area_id "lid"
                from encounters e2
                where version_id = ${this.state.version}
                ) e on p.id = e.pid
            left join pokemon_species ps on p.species_id = ps.id
            where p.id in (select pokemon_id from encounters e where version_id = ${this.state.version})
            group by p.id
            order by "Possible Locations" desc;`)[0];
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
                    <span>Show how many locations each Pokemon can be encounted at in Pokemon </span> 
                    <QueryOptionsDropdown 
                        onChange={(x) => {this.setState({version: x})}} 
                        query="select id, name from versions v where v.id in (select e.version_id from encounters e);"/> 
                    <span>.</span>

                    <p className='italics'>In this context, a "location" may be a specific patch of grass, a specific fishing pond, a specific building with an NPC interaction, etc.</p>
                    
                    <Button size="sm" onClick={() => {this.runQuery()}}>Query</Button>
                </div>
                <hr/>
                {table}
            </div>
        );
    }
}