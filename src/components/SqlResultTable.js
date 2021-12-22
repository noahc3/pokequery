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

        let downloadBtn;

        if (rows.length > 100000) {
            downloadBtn = <Button disabled size="sm"><span className="italics">CSV dump unavailable, too large (&gt;100000 rows).</span></Button>
        } else if (rows.length > 2000) {
            downloadBtn = <Button color="warning" size="sm" onClick={() => this.saveAsCsv()}>Dump as CSV <span className="italics">(may take up to 30 seconds).</span></Button>
        } else {
            downloadBtn = <Button size="sm" onClick={() => this.saveAsCsv()}>Dump as CSV</Button>
        }

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