import React, { Component } from 'react'
import QuestionLog from '../components/QuestionLog.js'
import Header from '../components/Header.js'
import {BrowserRouter as Router, Link, Route, Redirect} from 'react-router-dom'
import db from '../services/firebase.js';

export default class Guesser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            question: '',
            guess: ''
        }

        this.handleQuestionChange = this.handleQuestionChange.bind(this);
        this.handleGuessChange = this.handleGuessChange.bind(this);
        this.handleQuestionSubmit = this.handleQuestionSubmit.bind(this);
        this.handleGuessSubmit = this.handleGuessSubmit.bind(this);
    }

    handleQuestionChange(event) {
        this.setState({
            question: event.target.value
        })
    }

    handleGuessChange(event) {
        this.setState({
            guess: event.target.value
        })
    }

    handleQuestionSubmit(event) {
        event.preventDefault();
        db.ref("games/" + this.props.roomCode + "/questions").push({
            timestamp: (new Date()).getTime(),
            questionText: this.state.question,
            userName: this.props.userName,
            isGuess: false,
            answer: null
        })
        this.setState({
            question: ''
        })
    }

    handleGuessSubmit(event) {
        event.preventDefault();
        db.ref("games/" + this.props.roomCode + "/questions").push({
            timestamp: (new Date()).getTime(),
            questionText: this.state.guess,
            userName: this.props.userName,
            isGuess: true,
            answer: null
        })
        this.setState({
            guess: ''
        })
    }

    render() {
        return this.state.finished ? (
            <Redirect to="/end" />
        ) : (
            <div className="game-page guesser-page">
                <Header />

                <form className="question-form" onSubmit={this.handleQuestionSubmit}>
                    <label htmlFor="question-input-box">
                        Ask a question:
                    </label>
                    <input
                        id="question-input-box"
                        value={this.state.question}
                        onChange={this.handleQuestionChange}
                        placeholder="Is it bigger than a breadbox?">
                    </input>
                    <button type="submit" disabled={this.state.question === ""}>
                        Ask
                    </button>
                </form>

                <form className="guess-form" onSubmit={this.handleGuessSubmit}>
                    <label htmlFor="guess-input-box">
                        Venture a guess:
                    </label>
                    <input
                        id="guess-input-box"
                        value={this.state.guess}
                        onChange={this.handleGuessChange}
                        placeholder="bread">
                    </input>
                    <button type="submit" disabled={this.state.guess === ""}>
                        Guess
                    </button>
                </form>

                <QuestionLog roomCode={this.props.roomCode}/>
            </div>
        )
    }
}
