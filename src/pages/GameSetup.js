import React, { Component } from 'react'
import Header from '../components/Header.js'
import {BrowserRouter as Router, Link, Route, Redirect} from 'react-router-dom'
import db from '../services/firebase';
import '../css/GameSetup.scss'

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

        db.ref("games/" + this.props.roomCode + "/started").on("value", snapshot => {
            const data = snapshot.val();
            if (data) {
                this.setState({
                    beginningGame: true
                })
            }
        })
    }

    /* Called after the Answerer submits a "thing". Starts the game round. */
    handleSubmitThing(event) {
        event.preventDefault();
        this.props.onSubmitThing(this.state.thing);
        let updates = {};
        updates["games/" + this.props.roomCode + "/started"] = true;
        db.ref().update(updates);
    }

    render() {
        return (
            this.state.beginningGame ? (
                <Redirect to="/game" />
            ) : (
                <div className="game-page game-setup-page">
                    <Header />
                    
                    <br/>
                    <div className="room-code-box">
                        <h2 className="send-the-code">
                            Send your friends this code:
                        </h2>
                        <h1 className="room-code">
                            {this.props.roomCode}
                        </h1>
                    </div>

                    <div className="current-players-list">
                        <h3 className="current-players-header">
                            People playing:
                        </h3>
                        <h2>
                            {this.state.currentPlayers.join(", ")}
                        </h2>
                    </div>

                    <h2 className="game-setup-header">
                        You're {this.props.isAnswerer ? "answering" : "guessing"} this round!
                    </h2>

                    
                    
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
                        </div> 
                    )}
                </div>
            )
        )
    }
}
