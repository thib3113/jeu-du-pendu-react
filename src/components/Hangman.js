import React, {Component} from "react";
import shuffle            from "lodash.shuffle";
import {connect}          from "react-redux";
import {itemsFetchData}   from "../actions";
import HangManLetter      from "./HangManLetter";
import KeyboardLetter     from "./KeyboardLetter";

import "./../stylesheets/scss/HangMan.scss";
import Users              from "./Users";

let baseCharCode = "a".charCodeAt(0);
let numberOfLettersByLines = 13;

@connect((store) => {
    return {
        words       : store.words,
        wordsLoading: store.loading,
        hasError    : store.errors.length > 0,
        errors      : store.errors
    };
})
export default class Hangman extends Component {
    //divide all letters in two rows
    letterRows = [
        new Array(numberOfLettersByLines).fill(1).map((_, i) => String.fromCharCode(baseCharCode + i)),
        new Array(numberOfLettersByLines).fill(1).map(
            (_, i) => String.fromCharCode(baseCharCode + numberOfLettersByLines + i))
    ];


    state = {
        currentWord       : "",
        lettersMissing    : 1,//0 == win
        currentKeysPressed: [],
        score             : 0
    };

    resetGame(newWords) {

        if (typeof newWords === "undefined" && (!this.props.words || this.props.words.length === 0)) {
            //get the dictionary
            this.props.dispatch(itemsFetchData("dict.json"));
            return;
        }

        let word = this.getRandomWord(newWords);
        this.setState({
                          currentWord       : word,
                          lettersMissing    : word.length,
                          currentKeysPressed: [],
                          score             : 0
                      });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.words !== this.props.words) {
            this.resetGame(nextProps.words);
        }
    }

    componentDidMount() {
        this.resetGame();
        document.addEventListener("keypress", (event) => this.handleKeyboardPress(event));
    }

    componentWillUnmount() {
        document.removeEventListener("keypress", (event) => this.handleKeyboardPress(event));
    }

    render() {
        if (!this.props.wordsLoading && !this.props.hasError) {
            return (
                <div>
                    <div className="container">
                        <div className="container">
                            <div className="score-container">
                                Score : {this.state.score}
                            </div>
                            <Users />
                            <div className="hangman-container"/>
                            <div className="hangmanLetters">
                                {this.state.currentWord.split("").map(((letter, index) => (
                                    <HangManLetter letter={letter} key={index}
                                                   selected={this.state.currentKeysPressed.includes(letter)}/>
                                )))}
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className={`col-sm keyBoard ${this.state.lettersMissing <= 0 ? "d-none" : ""}`}>
                            {this.letterRows.map((letters, index) => (
                                <div key={index} className="row">
                                    {letters.map((letter) => (
                                        <KeyboardLetter key={letter} onClick={this.handleClick} letter={letter}
                                                        selected={this.state.currentKeysPressed.includes(letter)}/>
                                    ))}
                                </div>
                            ))}
                        </div>
                        <div className={`col-sm text-center ${this.state.lettersMissing > 0 ? "d-none" : ""}`}>
                            <button className="btn btn-outline-success" onClick={() => {this.resetGame();}}>Recommencer
                            </button>
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div>
                    <div className="container">
                        Chargement des mots en cours ....
                        {this.props.hasError && <div>Une erreur est apparue : <br/>
                            <ul>{
                                this.props.errors.map((error, i) => (
                                    <li key={i}>{error.message}</li>
                                ))
                            }</ul>
                        </div>}
                    </div>
                </div>
            );
        }
    }

    getRandomWord(newWords = this.props.words) {
        const candidates = shuffle(newWords);

        return candidates.pop().toLowerCase();
        // return "test";
    }

    tryLetter(letter) {
        //the game is already finished ?
        if (this.state.lettersMissing <= 0)
            return;

        let score = this.state.score;
        if (this.state.currentWord.includes(letter)) {
            if (!this.state.currentKeysPressed.includes(letter)) {
                this.setState(
                    {lettersMissing: this.state.lettersMissing - (this.state.currentWord.split(letter).length - 1)});
                score++;
            }
        }
        else if (this.state.currentKeysPressed.includes(letter)) {
            score -= 2;
        }
        else
            score--;

        this.state.currentKeysPressed.push(letter);

        this.setState({score: score});
    }

    //arrow fx for binding
    handleClick = letter => {
        this.tryLetter(letter.toLowerCase());
    };

    handleKeyboardPress({target, charCode, key:letter}) {
        //check if keyBoard event go in an input
        if(target instanceof HTMLInputElement && target.type === 'text')
            return;

        //check if it's a char, and if it's an ASCII char
        if (charCode > 122 || charCode < 97)
            return;

        this.tryLetter(letter.toLowerCase());
    }
}