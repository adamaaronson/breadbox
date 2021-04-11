import React, { Component } from 'react'
import QuestionLog from '../components/QuestionLog.js'
import db from '../services/firebase.js'

export default class Answerer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            answer: ''
        }
        
        this.handleClickAnswer = this.handleClickAnswer.bind(this)
    }

    async componentDidMount() {
        var questionsRef = db.ref("games/" + this.props.roomCode + "/questions");
        questionsRef.on('child_added', (data) => {
            let userName = this.getUserNameFromID(data.val().userID).then((name) => {
                const newQuestion = {
                    questionID: data.key,
                    userName: name,
                    questionText: data.val().questionText,
                    isGuess: data.val().isGuess
                };
    
                console.log(data.val().questionText);
                
                this.setState(prevState => {
                    prevState.questions.push(newQuestion);
                    return prevState;
                })
            })
        });
    }

    getUserNameFromID(id) {
        return db.ref("games/" + this.props.roomCode + "/memberIDs/" + id).once("value").then(
            snapshot => snapshot.val().name
        )
    }

    handleClickAnswer(event) {
        event.preventDefault();
        console.log(event.target.value)
        // TODO: Update the question in the DB to be answered
        this.setState(prevState => {
            prevState.questions.shift();
            return prevState;
        })
    }

    // TODO: receive questions/guesses from firebase

    render() {
        let noQuestions = this.state.questions.length === 0;
        return (
            <div>
                <h2>
                    Your name is {this.props.userName}.
                </h2>
                <p>You are thinking of...</p>
                <h2>{this.props.thing}</h2>

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
                                Close!
                            </button>
                        </div>
                    )}
                    
                </div>

                <QuestionLog />
            </div>
        )
    }
}
