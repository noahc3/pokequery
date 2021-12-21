import React from "react";
import * as sql from "../SqlApi";
import { Dropdown } from "react-bootstrap";

export default class QueryOptionsDropdown extends React.Component {
    constructor(props) {
        super(props);
        
        const query = this.props.query;
        const result = sql.exec(query)[0];
        this.state = {
            options: result.values,
            selectedOption: result.values[0][0],
            onChange: this.props.onChange
        }
    }

    setValue(key) {
        this.setState({selectedOption: key});
        this.props.onChange(key);
    }

    render() {
        const options = this.state.options;
        const selectedOption = options.filter(x => x[0] === this.state.selectedOption)[0];

        return (
            <Dropdown className="query-dropdown">
                <Dropdown.Toggle size="sm" variant="success" id="dropdown-basic">
                    {selectedOption[1]}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {options.map((x, i) => (
                        <Dropdown.Item active={selectedOption[0] === x[0]} onClick={() => {this.setValue(x[0])}} key={i} eventKey={i}>{x[1]}</Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        );
    }
}