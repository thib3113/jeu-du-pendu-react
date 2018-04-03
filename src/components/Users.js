import React, {Component}         from "react";
import {connect}                  from "react-redux";
import {CREATE_USER, RESET_SCORE} from "../constants/action-types";
// import "./../stylesheets/scss/Users.scss";
import User                       from "./User";

@connect((store) => {
    return {
        users: store.users
    };
})
export default class Users extends Component {
    resetScore = () => {
        this.props.dispatch({
                                type: RESET_SCORE
                            });
    };

    render() {
        return (
            <div className="users-container">
                <table className="table">
                    <tbody>
                    {this.props.users.map(({uuid, name, score, added, hisTurn}) =>
                                              (<User key={uuid} uuid={uuid} name={name} hisTurn={hisTurn} added={added}
                                                     score={score}/>))
                    }
                    <tr>
                        <td colSpan="3" className="pointer" onClick={this.addUser} bgcolor="#f0f8ff">
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