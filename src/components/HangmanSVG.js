import PropTypes from "prop-types";
import React     from "react";

export default class HangmanSVG extends React.Component {
    static propTypes = {
        fails: PropTypes.number.isRequired
    };

    dropBody() {

        import("velocity-animate").then(v => {
            document.querySelector("#hangmanSVG .rEyes").classList.add("hide");
            document.querySelector("#hangmanSVG .xEyes").classList.remove("hide");

            Velocity(document.querySelector("#hangmanSVG .door1"), {rotateZ: 90}, 1000);
            Velocity(document.querySelector("#hangmanSVG .door2"), {rotateZ: -90}, 1000);

            let dur = 500;
            let del = 1000;
            Velocity(document.querySelector("#hangmanSVG .body"), {translateY: "200px"}, {duration: dur, delay: del});
            Velocity(document.querySelector("#hangmanSVG .rope"), {y2: "+=200px"}, {duration: dur, delay: del});
            Velocity(document.querySelector("#hangmanSVG .armL"), {y2: "-=60px"}, {duration: dur, delay: del});
            Velocity(document.querySelector("#hangmanSVG .armR"), {y2: "-=60px"}, {duration: dur, delay: del});

            Velocity(document.querySelector("#hangmanSVG .armL"), {y2: "+=70px", x2: "+=10px"}, 500);
            Velocity(document.querySelector("#hangmanSVG .armR"), {y2: "+=70px", x2: "-=10px"}, 500);
        }).catch(error => console.error("An error occurred while loading velocity"));
    }

    dropBodyTimeout = null;

    render() {
        if (this.props.fails === 10) {
            if (this.dropBodyTimeout != null) clearTimeout(this.dropBodyTimeout);
            this.dropBodyTimeout = setTimeout(() => this.dropBody(), 500);
        }
        return (
            <svg id="hangmanSVG" height="400" width="400">
                {this.props.fails > 0 && (
                    <g className="body">
                        {this.props.fails > 4 && (
                            <g id="head">
                                <circle cx="200" cy="80" r="20" stroke="black" strokeWidth="4" fill="white"/>
                                <g className="rEyes">
                                    <circle cx="193" cy="80" r="4"/>
                                    <circle cx="207" cy="80" r="4"/>
                                </g>
                                <g className="xEyes hide">
                                    <line x1="190" y1="78" x2="196" y2="84"/>
                                    <line x1="204" y1="78" x2="210" y2="84"/>
                                    <line x1="190" y1="84" x2="196" y2="78"/>
                                    <line x1="204" y1="84" x2="210" y2="78"/>
                                </g>
                            </g>
                        )}
                        {this.props.fails > 5 && (
                            <line className="body" x1="200" y1="100" x2="200" y2="150"/>
                        )}
                        {this.props.fails > 6 && (
                            <line className="armL" x1="200" y1="120" x2="170" y2="140"/>
                        )}
                        {this.props.fails > 7 && (
                            <line className="armR" x1="200" y1="120" x2="230" y2="140"/>
                        )}
                        {this.props.fails > 8 && (
                            <line className="legL" x1="200" y1="150" x2="180" y2="190"/>
                        )}
                        {this.props.fails > 9 && (
                            <line className="legR" x1="200" y1="150" x2="220" y2="190"/>
                        )}
                    </g>
                )}
                {this.props.fails > 0 && (
                    <line className="floor" x1="10" y1="250" x2="150" y2="250"/>
                )}
                {this.props.fails > 0 &&
                 (
                     <line className="door1" x1="150" y1="250" x2="200" y2="250"/>
                 )}
                {this.props.fails > 0 &&
                 (
                     <line className="door2" x1="200" y1="250" x2="250" y2="250"/>
                 )}
                {this.props.fails > 0 &&
                 (
                     <line className="floor" x1="250" y1="250" x2="390" y2="250"/>
                 )}
                {this.props.fails > 1 && (
                    <line className="gibbetV" x1="100" y1="250" x2="100" y2="20"/>
                )}
                {this.props.fails > 2 && (
                    <line className="gibbetH" x1="100" y1="20" x2="200" y2="20"/>
                )}
                {this.props.fails > 3 && (
                    <line className="rope" x1="200" y1="20" x2="200" y2="60"/>
                )}
            </svg>
        );
    }
}