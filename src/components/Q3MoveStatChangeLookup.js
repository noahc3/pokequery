import React from 'react';
import * as sql from '../SqlApi';
import SqlResultTable from './SqlResultTable';
import { Button } from 'react-bootstrap';
import QueryOptionsDropdown from './QueryOptionsDropdown';

export default class Q3MoveStatChangeLookup extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            type: 1,
            stat: 1,
            target: 1,
            result: null
        }
    }

    runQuery() {
        const result = sql.exec(
            `select distinct ps.name Pokemon, m.name Move, CASE WHEN m.stat_chance = 0 THEN 100 ELSE m.stat_chance END || '%' "Success Chance", msc.change "Stat Change"
            from pokemon p
            left join pokemon_species ps on p.species_id = ps.id
            left join pokemon_moves pm on p.id = pm.pokemon_id
            left join moves m on pm.move_id = m.id
            left join move_stat_changes msc on m.id = msc.move_id
            left join stats s on msc.stat_id = s.id
            left join move_targets mt on m.target_id = mt.id
            where m.type_id = ${this.state.type}
            and mt.id = ${this.state.target}
            and s.id = ${this.state.stat}
            and msc.change not null
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
                    <span>type move which affects the </span>
                    <QueryOptionsDropdown 
                        onChange={(x) => {this.setState({stat: x})}} 
                        query="select s.id, s.name from stats s where s.id in (select distinct stat_id from moves m left join move_stat_changes msc on m.id = msc.move_id where msc.stat_id not null);"/> 
                    <span>stat and targets </span>
                    <QueryOptionsDropdown 
                        onChange={(x) => {this.setState({target: x})}} 
                        query="select mt.id, mt.name from move_targets mt where mt.id in (select distinct target_id from moves m left join move_stat_changes msc on m.id = msc.move_id where msc.stat_id not null);"/> 
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