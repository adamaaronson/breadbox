import React, { Component } from 'react'
import {BrowserRouter as Router, Link, Route, Redirect} from 'react-router-dom'

export default class GameSetup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            thing: '',
            currentPlayers: [],
            beginningGame: false
        };

        this.handleThingChange = this.handleThingChange.bind(this)
        this.handleSetThing = this.handleSetThing.bind(this)
    }

    componentDidMount() {
        // TODO: React to database changes to update currentPlayers in real-time
        this.setState({
            currentPlayers: ['Cale', 'Adam', 'Jack', 'Jackson']
        })
    }

    handleThingChange(event) {
        this.setState({
            thing: event.target.value
        })
    }

    handleSetThing(event) {
        // TODO: Launch a new game as the Answerer
        event.preventDefault();
        this.props.onSetThing(this.state.thing);
        this.setState({
            beginningGame: true
        })
    }

    render() {
        return (
            this.state.beginningGame ? (
                <Redirect to="/game" />
            ) : (
                <div>
                    {this.props.isAnswerer ? (
                        <h1>You're creating a new game!</h1>
                    ) : (
                        <h1>You joined the game!</h1>
                    )}
                    
                    <h2>Send your friends this code: {this.props.roomCode}</h2>
                    <h2>Current Players: {this.state.currentPlayers.join(", ")}</h2>
                    
                    {this.props.isAnswerer ? (
                        <form onSubmit={this.handleSetThing}>
                            <label htmlFor="thing-input-box">
                                Pick a thing:
                            </label>
                            <input
                                id="thing-input-box"
                                type="text"
                                onChange={this.handleThingChange}>
                            </input>
                            <button type="submit" disabled={this.state.thing === ""}>
                                Begin
                            </button>
                        </form>
                    ) : (
                        <div>
                            <h3>
                                Waiting for answerer to pick a thing...
                            </h3>
                            <Link to="/game">
                                {/* TODO: listen for answerer choice */}
                                Start guessing
                            </Link>
                        </div>
                        
                    )} 
                </div>
            )
            
        )
    }
}
