import React, {Component} from "react";
import {connect}          from "react-redux"

// import "./../stylesheets/scss/Users.scss";
import User               from "./User";

@connect((store) => {
    return {
        users       : store.users
    };
})
export default class Users extends Component {
    render(){
        return (
            <div className="users-container">
                <table className="table">
                    <tbody>
                    {this.props.users.map(({id, name, score})=>
                                              (<User key={id} uuid={id} name={name} score={score}/>))
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}