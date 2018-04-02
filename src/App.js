import React, {Component} from 'react';
// import logo from './logo.svg';
import './stylesheets/scss/App.scss';
import {hot}              from "react-hot-loader";
import Hangman            from "./components/Hangman";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Hangman/>
            </div>
        );
    }
}


export default hot(module)(App);
// export default App;
