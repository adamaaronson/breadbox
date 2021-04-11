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
                    Answer log
                </h3>
                {this.state.questions.length == 0 ? (
                    <div className="no-questions">
                        No questions answered!
                    </div>
                ) : (
                    <div className="question-log-table">
                        {this.state.questions.slice(0).reverse().map((question, index) => 
                            <React.Fragment key={"q" + index}>
                                <span className="question-number">
                                    {this.state.questions.length - index}
                                </span>
                                <span className="question-log-name">
                                    {question.userName} {question.isGuess ? "guessed:" : "asked:"}
                                </span>
                                <span className="question-log-question">
                                    {question.questionText}
                                </span>
                                <span className={"question-log-answer " + (question.answer.startsWith("No") ? "answer-no" : "") + (question.answer.startsWith("Yes") ? "answer-yes" : "")}>
                                    {question.answer}
                                </span>
                            </React.Fragment>
                        )}
                    </div>
                )}
                
                
                
            </div>
        )
    }
}
