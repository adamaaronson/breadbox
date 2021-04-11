import React, { Component } from 'react'
import {BrowserRouter as Router, Link, Route, Redirect} from 'react-router-dom'
import db from '../services/firebase';

export default class GameSetup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            thing: '',
            currentPlayers: [],
            beginningGame: false
        };

        this.handleThingChange = this.handleThingChange.bind(this)
        this.handleSubmitThing = this.handleSubmitThing.bind(this)
    }

    handleThingChange(event) {
        this.setState({
            thing: event.target.value
        })
    }

    /* Updates in real-time as players join the game */
    async componentDidMount() {
        db.ref("games/" + this.props.roomCode + "/memberIDs").on("value", snapshot => {
            let players = []
            snapshot.forEach((person) => {
                players.push(person.val().name);
            })
            this.setState({
                currentPlayers: players
            })
        })
    }

    /* Called after the Answerer submits a "thing". Starts the game round. */
    handleSubmitThing(event) {
        event.preventDefault();
        this.props.onSubmitThing(this.state.thing);
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
                        <form onSubmit={this.handleSubmitThing}>
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
                                {/* TODO: Is this necessary */}
                                Start guessing
                            </Link>
                        </div>
                        
                    )} 
                </div>
            )
        )
    }
}