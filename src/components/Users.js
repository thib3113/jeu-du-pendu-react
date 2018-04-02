import React, {Component} from "react";
import {connect}          from "react-redux";
import {CREATE_USER}      from "../constants/action-types";
// import "./../stylesheets/scss/Users.scss";
import User               from "./User";

@connect((store) => {
    return {
        users: store.users
    };
})
export default class Users extends Component {
    render() {
        return (
            <div className="users-container">
                <table className="table">
                    <tbody>
                    {this.props.users.map(({uuid, name, score, added}) =>
                                              (<User key={uuid} uuid={uuid} name={name} added={added} score={score}/>))
                    }
                    <tr>
                        <td colSpan="3" onClick={this.addUser} bgcolor="#f0f8ff">
                            Ajouter un utilisateur
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }

    addUser = () => this.props.dispatch({type: CREATE_USER});
}