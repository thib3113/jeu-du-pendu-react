import React from "react";
import PropTypes from "prop-types";

import "../stylesheets/scss/HangManLetter.scss"

export default class HangManLetter extends React.Component{
    static propTypes = {
        selected: PropTypes.bool.isRequired,
        letter: PropTypes.string.isRequired
    };

    render(){
        return (
            <span className="col-sm hangman-letter">
                {this.props.selected? this.props.letter: "_"}
            </span>
        )
    }
}