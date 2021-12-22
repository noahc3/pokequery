import React from 'react';
import * as sql from '../SqlApi';
import SqlResultTable from './SqlResultTable';
import { Button } from 'react-bootstrap';
import QueryOptionsDropdown from './QueryOptionsDropdown';

export default class Q2MoveAilmentLookup extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            type: 1,
            ailment: 1,
            result: null
        }
    }

    runQuery() {
        const result = sql.exec(
            `select distinct ps.name Pokemon, m.name Move, CASE WHEN m.ailment_chance = 0 THEN 100 ELSE m.ailment_chance END || '%' "Success Chance"
            from pokemon p
            left join pokemon_species ps on p.species_id = ps.id
            left join pokemon_moves pm on p.id = pm.pokemon_id
            left join moves m on pm.move_id = m.id
            left join ailments a on m.ailment_id = a.id
            left join types t on m.type_id = t.id
            where m.type_id = ${this.state.type}
            and a.id = ${this.state.ailment}
            order by m.id;`)[0];
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
                    <span>Show all Pokemon that can learn a </span> 
                    <QueryOptionsDropdown 
                        onChange={(x) => {this.setState({type: x})}} 
                        query="select id, name from types;"/> 
                    <span>type move which inflicts the </span>
                    <QueryOptionsDropdown 
                        onChange={(x) => {this.setState({ailment: x})}} 
                        query="select a.id, a.name from ailments a where a.id in (select distinct m.ailment_id from moves m where m.ailment_id not null and m.ailment_id > 0)"/> 
                    <span>ailment.</span>
                    <p/>
                    <Button size="sm" onClick={() => {this.runQuery()}}>Query</Button>
                </div>
                <hr/>
                {table}
            </div>
        );
    }
}