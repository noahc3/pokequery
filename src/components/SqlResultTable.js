import React from "react";
import { Button, Table } from "react-bootstrap";
import { saveAs } from "file-saver";


export default class SqlResultTable extends React.Component {

    saveAsCsv() {
        const cols = this.props.cols;
        const rows = this.props.rows;
        let csv = "";

        cols.forEach((x) => {
            csv += x + ","
        });

        csv = csv.slice(0, -1);
        csv += "\n";

        rows.forEach((r) => {
            r.forEach((x) => {
                csv += x + ","
            });

            csv = csv.slice(0, -1);
            csv += "\n";
        });

        saveAs(new Blob([csv], {type: "text/plain;charset=utf-8"}), "output.csv");
    }

    render() {
        const cols = this.props.cols;
        const rows = this.props.rows;
        return (
            <div className="sql-result-table">
                <div><p>Got {rows.length} results. <Button size="sm" onClick={() => this.saveAsCsv()}>Dump as CSV</Button></p></div>
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