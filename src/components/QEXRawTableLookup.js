import React from 'react';
import * as sql from '../SqlApi';
import SqlResultTable from './SqlResultTable';
import { Button } from 'react-bootstrap';
import QueryOptionsDropdown from './QueryOptionsDropdown';

export default class QEXRawTableLookup extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            table: "ailments",
            result: null
        }
    }

    runQuery() {
        const result = sql.exec(
            `select * from ${this.state.table};`)[0];
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
                    <span>Show all data for the </span> 
                    <QueryOptionsDropdown 
                        onChange={(x) => {this.setState({table: x})}} 
                        query={`select distinct tbl_name, tbl_name from sqlite_master where type = "table";`}/> 
                    <span>table.</span>
                    <p/>                    
                    <Button size="sm" onClick={() => {this.runQuery()}}>Query</Button>
                </div>
                <hr/>
                {table}
            </div>
        );
    }
}