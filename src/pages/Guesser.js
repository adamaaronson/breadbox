import React, { Component } from 'react'
import QuestionLog from '../components/QuestionLog.js'
import Header from '../components/Header.js'
import {Redirect} from 'react-router-dom'
import db from '../services/firebase.js';
import '../css/Player.scss'

export default class Guesser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            question: '',
            guess: '',
            finished: false,
            answererName: '',
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

    async componentDidMount() {
        db.ref('games/' + this.props.roomCode + "/finished").on("value", (snapshot) => {
            if (snapshot.val()) {
                this.setState({
                    finished: true
                });
            }
        })

        // Loads in the answerer's name
        db.ref('games/' + this.props.roomCode + "/answererID").once("value", (snapshot) => {
            db.ref('games/' + this.props.roomCode + "/memberIDs/" + snapshot.val()).once("value", (snap) => {
                this.setState({
                    answererName: snap.val().name
                })
                console.log(snap.val().name)
            })
        })
    }

    componentWillUnmount() {
        db.ref('games/' + this.props.roomCode + "/finished").off();
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
            <Redirect to="./end" />
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

                <h3 className="thing-youre-thinking-of">{this.state.answererName} is thinking of something...</h3>

                <div className="player-body">
                <div className="player-body-main">
                    <form className="question-form" onSubmit={this.handleQuestionSubmit}>
                            <label className="question-box-label" htmlFor="question-input-box">
                                Ask a question:
                            </label>
                            <div className="guesser-input-wrapper">
                                <input
                                    className="guesser-input"
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
                                    className="guesser-input"
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
