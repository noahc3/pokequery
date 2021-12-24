import React from "react";
import { Button, Table } from "react-bootstrap";
import { saveAs } from "file-saver";


export default class SqlResultTable extends React.Component {

    saveAsCsv() {
        const cols = this.props.cols;
        const rows = this.props.rows;

        let blob = new Blob([[cols.join(",")].concat(rows.map(x => x.join(","))).join("\n")], {type: "text/plain;charset=utf-8"});

        saveAs(blob, "output.csv");
    }i

    render() {
        const cols = this.props.cols;
        const rows = this.props.rows;

        let downloadBtn = <Button size="sm" onClick={() => this.saveAsCsv()}>Dump as CSV</Button>

        return (
            <div className="sql-result-table">
                <div><p>Got {rows.length} results. {downloadBtn}</p></div>
                {rows.length > 1500 &&
                    <p>Warning: Too many rows to display, only first 1500 rows are shown. All rows will be included in CSV dump.</p>
                }
                <div className="limit">
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                {cols.map((name, i) => (<td key={i}>{name}</td>))}
                            </tr>
                        </thead>
                        <tbody>
                            {rows.slice(0, 2000).map((row, i) => (
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