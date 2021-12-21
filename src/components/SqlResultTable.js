import React from "react";
import { Table, Pagination } from "react-bootstrap";


export default class SqlResultTable extends React.Component {

    render() {
        const cols = this.props.cols;
        const rows = this.props.rows;
        return (
            <div className="sql-result-table">
                <div><p>Got {rows.length} results.</p></div>
                <div className="limit">
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                {cols.map((name, i) => (<td key={i}>{name}</td>))}
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, i) => (
                                <tr key={i}>
                                    {row.map((value, i) => (
                                        <td key={i}>{value}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
            
        )
    }
}