import React, { Component } from 'react'
import db from '../services/firebase.js';

export default class QuestionLog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            awaitQuestions: true,
            questions: []
        }
    }

    async componentDidMount() {
        this.setState({
            awaitQuestions: true
        })
        db.ref("games/" + this.props.roomCode + "/questions").on('child_changed', (data) => {
            if (this.state.awaitQuestions) {
                let newQuestionData = {
                    questionText: data.val().questionText,
                    userName: data.val().userName,
                    answer: data.val().answer,
                    isGuess: data.val().isGuess
                };

                let newQuestions = this.state.questions;
                newQuestions.push(newQuestionData);
                
                this.setState({
                    questions: newQuestions
                })
            }
        })
    }

    componentWillUnmount() {
        this.setState({
            awaitQuestions: false
        })
    }

    render() {
        return (
            <div>
                <h3 className="question-log-title">
                    Question Log
                </h3>
                <div className="question-log-table">
                    {this.state.questions.map((question, index) => 
                        <div key={"q" + index} className="question-log-row">
                            <span className="question-log-name">
                                {question.userName}
                            </span> <span className="question-log-asked">
                                {question.isGuess ? "guessed" : "asked"}
                            </span> <span className="question-log-question">
                                {question.questionText}
                            </span> <span className="question-log-answer">
                                {question.answer}
                            </span>
                        </div>
                    )}
                </div>
                
                
            </div>
        )
    }
}
