import React, {Component} from "react";
import PropTypes          from "prop-types";
import {UPDATE_USER}      from "../constants/action-types";

// import "./../stylesheets/scss/User.scss";

export default class User extends Component {
    static propTypes = {
        name:  PropTypes.string.isRequired,
        uuid:  PropTypes.string.isRequired,
        score: PropTypes.number.isRequired
    };

    state = {
        updating: false
    };

    render() {
        return (
            <tr>
                <th onDoubleClick={this.onDoubleClickName}>{this.state.updating ? <form onSubmit={this.submitName}>
                                                                                    <input
                                                                                        ref={(field) => { this.nameField = field; }} defaultValue={this.props.name}/></form>
                                                                                : this.props.name}</th>
                <th>{this.props.score}</th>
            </tr>
        );
    }

    submitName = () => {
        console.log(this.nameField.value);
        this.props.dispatch({
                                type: UPDATE_USER,
                                user: {
                                    ...this.props,
                                    name: this.nameField.value
                                }
                            });
    };

    onDoubleClickName = () => {
        this.setState({updating: true});
    };
}