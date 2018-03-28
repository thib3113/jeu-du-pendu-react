import React     from "react";
import PropTypes from "prop-types";

import '../stylesheets/css/KeyboardLetter.css';

export default class KeyboardLetter extends React.Component {

    static propTypes = {
        letter: PropTypes.string.isRequired,
        selected: PropTypes.bool.isRequired,
        onClick: PropTypes.func.isRequired
    };

    render() {
        return (<span className={`col-sm letter ${this.props.selected? "selected":""}`} onClick={()=>this.props.onClick(this.props.letter)}>
            {this.props.letter}
        </span>);
    }
}