import PropTypes                  from "prop-types";
import React, {Component}         from "react";
import {connect}                  from "react-redux";
import {DELETE_USER, UPDATE_USER} from "../constants/action-types";

// import "./../stylesheets/scss/User.scss";
@connect()
export default class User extends Component {
    static propTypes = {
        name : PropTypes.string.isRequired,
        uuid : PropTypes.string.isRequired,
        score: PropTypes.number.isRequired,
        added:PropTypes.bool.isRequired
    };

    state = {
        updating: false
    };

    onBlurName = () => this.setState({updating: false});
    deleteUser = () => this.props.dispatch({type:DELETE_USER, user:this.props});

    render() {
        return (
            <tr>
                <th onDoubleClick={this.onDoubleClickName}>{this.state.updating ? <form onSubmit={this.submitName}>
                                                                                    <input placeholder="username"
                                                                                           onBlur={this.onBlurName}
                                                                                           ref={(field) => { this.nameField = field; }} defaultValue={this.props.name}/></form>
                                                                                : this.props.name}</th>
                <td>{this.props.score}</td>
                <td>{this.props.added && <span onClick={this.deleteUser} title="supprimer l'utilisateur">X</span>}</td>
            </tr>
        );
    }

    submitName = () => {
        event.preventDefault();
        event.stopPropagation();
        this.props.dispatch({
                                type: UPDATE_USER,
                                user: {
                                    ...this.props,
                                    name: this.nameField.value
                                }
                            });

        this.setState({updating: false});
    };

    onDoubleClickName = () => {
        this.setState({updating: true});
    };
}