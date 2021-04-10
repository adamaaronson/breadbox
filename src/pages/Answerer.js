import React, { Component } from 'react'
import QuestionLog from '../components/QuestionLog.js'

export default class Answerer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            guesstion: null
        }
    }

    // TODO: receive questions/guesses from firebase

    render() {
        return (
            <div>
                <p>You are thinking of...</p>
                <h2>{this.props.thing}</h2>

                <QuestionLog />
            </div>
        )
    }
}
