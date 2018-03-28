import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Letter from "./Letter";

class App extends Component {
    letters = [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z"
    ];

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
          <div className="keyBoard">
              {this.letters.map((letter)=> (
                  <Letter key={letter} letter={letter}/>
              ))}
          </div>
      </div>
    );
  }
}

export default App;
