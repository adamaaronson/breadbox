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
        db.ref("games/" + this.props.roomCode + "/questions").on('child_added', (data) => {
            if (this.state.awaitQuestions) {
                this.appendQuestion(data.val());
            }
        })
        db.ref("games/" + this.props.roomCode + "/questions").on('child_changed', (data) => {
            if (this.state.awaitQuestions) {
                this.updateQuestion(data.val());
            }
        })
    }

    componentWillUnmount() {
        this.setState({
            awaitQuestions: false
        })
    }

    appendQuestion(data) {
        let newQuestionData = {
            questionText: data.questionText,
            userName: data.userName,
            answer: data.answer,
            isGuess: data.isGuess
        };

        this.setState(prevState => ({
            questions: [...prevState.questions, newQuestionData]
        }))
    }

    updateQuestion(data) {
        const updatedQuestion = {
            questionText: data.questionText,
            userName: data.userName,
            answer: data.answer,
            isGuess: data.isGuess
        };
        const index = this.state.questions.findIndex((question) => question.questionText === data.questionText);
        let newQuestions = this.state.questions;
        newQuestions.splice(index, 1, updatedQuestion);
        this.setState({questions: newQuestions});
    }

    render() {
        return (
            <div>
                <h3 className="question-log-title">
                    Answer log
                </h3>
                {this.state.questions.length === 0 ? (
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
                                {!question.answer ? (
                                    <span className="unanswered-question">No answer</span>
                                ) : (
                                    <span className={"question-log-answer " + (question.answer.startsWith("No") ? "answer-no" : "") + (question.answer.startsWith("Yes") ? "answer-yes" : "")}>
                                        {question.answer}
                                    </span>)}
                            </React.Fragment>
                        )}
                    </div>
                )}
                
                
                
            </div>
        )
    }
}
