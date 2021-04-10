import React, { Component } from 'react'
import QuestionLog from '../components/QuestionLog.js'

export default class Guesser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            question: '',
            guess: '',
            isGuessing: false
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
        this.setState({
            isGuessing: false
        })
        // TODO: send question to guesstion queue
        this.setState({
            question: ''
        })
    }

    handleGuessSubmit(event) {
        event.preventDefault();
        this.setState({
            isGuessing: true
        })
        // TODO: send guess to guesstion queue
        this.setState({
            guess: ''
        })
    }

    render() {
        return (
            <div>
                <p>
                    Answerer is thinking of something...
                </p>

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

                <QuestionLog />
            </div>
        )
    }
}
