import React from 'react';
import * as sql from '../SqlApi';
import SqlResultTable from './SqlResultTable';
import { Button } from 'react-bootstrap';
import QueryOptionsDropdown from './QueryOptionsDropdown';
import NudOption from './NudOption';

export default class Q5PokemonEcounterLookup extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            version: 1,
            type: 1,
            min: 1,
            max: 100,
            result: null
        }
    }

    runQuery() {
        const result = sql.exec(
            `select * from 
            (select distinct ps.name "Pokemon", l.name "Location", v.name "Game", min(e.min_level) "Min Level", max(e.max_level) "Max Level" 
            from encounters e
            left join pokemon p on e.pokemon_id = p.id
            left join pokemon_species ps on p.species_id = ps.id
            left join pokemon_types pt on p.id = pt.pokemon_id
            left join versions v on e.version_id = v.id
            left join location_areas la on e.location_area_id = la.id
            left join locations l on la.location_id = l.id
            where v.id = ${this.state.version}
            and pt.type_id = ${this.state.type}
            group by p.id, l.id
            order by e.location_area_id)
            where "Max Level" >= ${this.state.min}
            and "Min Level" <= ${this.state.max};`)[0];
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
                    <span>Show where to catch </span> 
                    <QueryOptionsDropdown 
                        onChange={(x) => {this.setState({type: x})}} 
                        query="select id, name from types;"/> 
                    <span> type Pokemon between levels </span>
                    <NudOption 
                        onChange={(x) => {this.setState({min: x})}} 
                        initialValue={this.state.min}
                        min={0}
                        max={100}/> 
                    <span> and </span>
                    <NudOption 
                        onChange={(x) => {this.setState({max: x})}} 
                        initialValue={this.state.max}
                        min={0}
                        max={100}/> 
                    <span> in Pokemon </span>
                    <QueryOptionsDropdown 
                        onChange={(x) => {this.setState({version: x})}} 
                        query="select id, name from versions v where v.id in (select e.version_id from encounters e);"/> 
                    <span>.</span>
                    <p/>
                    <Button size="sm" onClick={() => {this.runQuery()}}>Query</Button>
                </div>
                <hr/>
                {table}
            </div>
        );
    }
}