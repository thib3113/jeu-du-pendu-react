import React     from "react";
import PropTypes from "prop-types";

import './Letter.css';

export default class Letter extends React.Component {

    static propTypes = {
        letter: PropTypes.string.isRequired
    };

    render() {
        return (<span className="letter">
            {this.props.letter}
        </span>);
    }
}