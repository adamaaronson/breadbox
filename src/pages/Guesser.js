import React, { Component } from 'react'
import QuestionLog from '../components/QuestionLog.js'
import Header from '../components/Header.js'
import {BrowserRouter as Router, Link, Route, Redirect} from 'react-router-dom'
import db from '../services/firebase.js';
import '../css/Player.scss'

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
                <div className="player-info-boxes">
                    <h3 className="player-name-box">
                        Name: {this.props.userName}
                    </h3>
                    <h3 className="player-roomcode-box">
                        Room code: {this.props.roomCode}
                    </h3>
                </div>

                <div className="player-body">
                <div className="player-body-main">
                    <form className="question-form" onSubmit={this.handleQuestionSubmit}>
                            <label className="question-box-label" htmlFor="question-input-box">
                                Ask a question:
                            </label>
                            <div className="guesser-input-wrapper">
                                <input
                                    class="guesser-input"
                                    id="question-input-box"
                                    type="text"
                                    value={this.state.question}
                                    onChange={this.handleQuestionChange}
                                    placeholder="Is it bigger than a breadbox?">
                                </input>
                                <button type="submit" disabled={this.state.question === ""}>
                                    Ask
                                </button>
                            </div>
                        </form>

                        <form className="guess-form" onSubmit={this.handleGuessSubmit}>
                            <label className="question-box-label" htmlFor="guess-input-box">
                                Venture a guess:
                            </label>
                            <div className="guesser-input-wrapper">
                                <input
                                    class="guesser-input"
                                    id="guess-input-box"
                                    type="text"
                                    value={this.state.guess}
                                    onChange={this.handleGuessChange}
                                    placeholder="Bread">
                                </input>
                                <button type="submit" disabled={this.state.guess === ""}>
                                    Guess
                                </button>
                            </div>
                        </form>
                    </div>
                    <QuestionLog roomCode={this.props.roomCode}/>
                </div>
                    
            </div>
        )
    }
}
