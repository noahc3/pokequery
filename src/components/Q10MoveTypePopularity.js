import React from 'react';
import * as sql from '../SqlApi';
import SqlResultTable from './SqlResultTable';
import { Button } from 'react-bootstrap';
import QueryOptionsDropdown from './QueryOptionsDropdown';

export default class Q10MoveTypePopularity extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            generation: 1,
            result: null
        }
    }

    runQuery() {
        const result = sql.exec(
            `select t.name, count(*) "Count" from moves m
            left join generations g on m.generation_id = g.id
            left join types t on m.type_id = t.id
            where m.generation_id = ${this.state.generation}
            group by t.id
            order by "Count" desc;`)[0];
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
                    <span>Show the number of moves of each type introduced in </span> 
                    <QueryOptionsDropdown 
                        onChange={(x) => {this.setState({generation: x})}} 
                        query="select id, name from generations;"/> 
                    <span>.</span>
                    <p className='italics'>In situations where move typings have changed (ex. Fairy type), the newest type data is used.</p>                    
                    <Button size="sm" onClick={() => {this.runQuery()}}>Query</Button>
                </div>
                <hr/>
                {table}
            </div>
        );
    }
}