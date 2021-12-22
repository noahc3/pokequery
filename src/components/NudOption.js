import React from "react";
import { Form } from "react-bootstrap";

export default class NudOption extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: this.props.initialValue
        }
    }

    setValue(val) {
        val = Math.min(this.props.max, Math.max(this.props.min, val.target.value));
        this.setState({value: val});
        this.props.onChange(val);
    }

    render() {
        return (
            <div className="nud-input">
                <Form.Control size="sm" type="number" min={this.props.min} max={this.props.max} value={this.state.value} onChange={(x) => this.setValue(x)} />
            </div>
        );
    }
}