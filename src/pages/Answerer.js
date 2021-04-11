import React, { Component } from 'react'
import QuestionLog from '../components/QuestionLog.js'
import Header from '../components/Header.js'
import {BrowserRouter as Router, Link, Route, Redirect} from 'react-router-dom'
import db from '../services/firebase.js'

export default class Answerer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            answer: '',
            thing: '',
            finished: false
        }
        
        this.handleClickAnswer = this.handleClickAnswer.bind(this)
    }

    /**
     * Updates the question "queue" as Guessers ask questions/guesses
     */
    async componentDidMount() {
        // Update the question queue
        var questionsRef = db.ref("games/" + this.props.roomCode + "/questions");
        questionsRef.on('child_added', (data) => {
            const newQuestion = {
                questionID: data.key,
                userName: data.val().userName,
                questionText: data.val().questionText,
                isGuess: data.val().isGuess
            };

            this.setState(prevState => {
                prevState.questions.push(newQuestion);
                return prevState;
            })
        });

        // Load in the game "thing"
        db.ref("games/" + this.props.roomCode + "/thing").on('value', (snapshot) => {
            this.setState({
                thing: snapshot.val()
            })
        })

        // Check for if the game is finished
        db.ref('games/' + this.props.roomCode + "/finished").on("value", (snapshot) => {
            if (snapshot.val()) {
                this.setState({
                    finished: true
                });
            }
        })
    }

    /**
     * Marks the question/guess with an answer and updates the queue
     */
    handleClickAnswer(event) {
        event.preventDefault();
        let updates = {};
        updates["/games/" + this.props.roomCode + "/questions/" + this.state.questions[0].questionID + "/answer"] = event.target.value;
        db.ref().update(updates);
        
        if (this.state.questions[0].isGuess && event.target.value === "Yes") {

            // TODO: Track winner in the database
            // this.setState({
                
            //     winner: this.state.questions[0].userName
            // })

            // this.props.onSetWinner(this.state.questions[0].userName)

            updates = {};
            updates["/games/" + this.props.roomCode + "/finished"] = true;
            updates["/games/" + this.props.roomCode + "/winnerName"] = this.state.questions[0].userName;
            db.ref().update(updates);
        }

        // Append to questions list
        this.setState(prevState => {
            prevState.questions.shift();
            return prevState;
        })
    }

    render() {
        let noQuestions = this.state.questions.length === 0;
        return this.state.finished ? (
            <Redirect to="/end" />
        ) : (
            <div className="game-page answerer-page">
                <Header />
                <h2>
                    Your name is {this.props.userName}.
                </h2>
                <p>You are thinking of...</p>
                <h2>{this.state.thing}</h2>

                <div className="answer-area">
                    {noQuestions ? (
                        <h3 className="waiting-for-questions">
                            Waiting for questions...
                        </h3>
                    ) : (
                        <div className="question-box">
                            <h4 className="person-asking">
                                {this.state.questions[0].userName} {this.state.questions[0].isGuess ? "guesses" : "asks"}...
                            </h4>
                            <h3 className="question-asked">
                                {this.state.questions[0].questionText}
                            </h3>
                        </div>
                    )}
                    {noQuestions || !this.state.questions[0].isGuess ? (
                        <div className="question-answer-buttons">
                            <button value="Yes" disabled={noQuestions} onClick={this.handleClickAnswer}>
                                Yes
                            </button>
                            <button value="No" disabled={noQuestions} onClick={this.handleClickAnswer}>
                                No
                            </button>
                            <button value="Sometimes" disabled={noQuestions} onClick={this.handleClickAnswer}>
                                Sometimes
                            </button>
                            <button value="Not sure" disabled={noQuestions} onClick={this.handleClickAnswer}>
                                Not sure
                            </button>
                            <button value="Irrelevant" disabled={noQuestions} onClick={this.handleClickAnswer}>
                                Irrelevant
                            </button>
                        </div>
                    ) : (
                        <div className="guess-answer-buttons">
                            <button value="Yes" disabled={noQuestions} onClick={this.handleClickAnswer}>
                                Yes
                            </button>
                            <button value="No" disabled={noQuestions} onClick={this.handleClickAnswer}>
                                No
                            </button>
                            <button value="Close" disabled={noQuestions} onClick={this.handleClickAnswer}>
                                Close
                            </button>
                        </div>
                    )}
                    
                </div>

                <QuestionLog roomCode={this.props.roomCode}/>
            </div>
        )
    }
}
