import React from 'react';
import * as sql from '../SqlApi';
import SqlResultTable from './SqlResultTable';
import { Button } from 'react-bootstrap';
import QueryOptionsDropdown from './QueryOptionsDropdown';
import NudOption from './NudOption';

export default class Q4EffectiveMoveLookup extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            type: 1,
            pp: 5,
            accuracy: 50,
            result: null
        }
    }

    runQuery() {
        const result = sql.exec(
            `select m.name "Move", tsrc.name "Type", m.pp "PP", m.accuracy || '%' "Accuracy"
            from moves m
            left join type_efficacy te on m.type_id = te.source_type_id
            left join types tsrc on te.source_type_id = tsrc.id
            left join types tdest on te.target_type_id = tdest.id
            where damage_factor > 100
            and tdest.id = ${this.state.type}
            and m.pp >= ${this.state.pp}
            and m.accuracy >= ${this.state.accuracy};`)[0];
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
                    <span>Show all moves that are super effective against </span> 
                    <QueryOptionsDropdown 
                        onChange={(x) => {this.setState({type: x})}} 
                        query="select id, name from types;"/> 
                    <span> type Pokemon with a PP of at least </span>
                    <NudOption 
                        onChange={(x) => {this.setState({pp: x})}} 
                        initialValue={this.state.pp}
                        min={0}
                        max={40}/> 
                    <span> and an accuracy of at least </span>
                    <NudOption 
                        onChange={(x) => {this.setState({accuracy: x})}} 
                        initialValue={this.state.accuracy}
                        min={0}
                        max={100}/> 
                    <span> percent.</span>
                    <p/>
                    <Button size="sm" onClick={() => {this.runQuery()}}>Query</Button>
                </div>
                <hr/>
                {table}
            </div>
        );
    }
}