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
        console.log("Game setup loaded");

        db.ref("games/" + this.props.roomCode + "/questions").remove();

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

    componentWillUnmount() {
        db.ref("games/" + this.props.roomCode + "/memberIDs").off();
        db.ref("games/" + this.props.roomCode + "/started").off();
    }

    /* Called after the Answerer submits a "thing". Starts the game round. */
    handleSubmitThing(event) {
        event.preventDefault();
        //this.props.onSubmitThing(this.state.thing);
        let updates = {};
        updates["games/" + this.props.roomCode + "/started"] = true;
        updates["games/" + this.props.roomCode + "/thing"] = this.state.thing;
        db.ref().update(updates);
    }

    render() {
        return (
            this.state.beginningGame ? (
                <Redirect to="/game" />
            ) : (
                <div className="game-page game-setup-page">
                    <Header />
                    
                    <h2 className="game-setup-header">
                        You're {this.props.isAnswerer ? "answering" : "guessing"} this round!
                    </h2>

                    <div className="room-code-box">
                        <h3 className="send-the-code">
                            Send your friends this code:
                        </h3>
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

                    

                    
                    
                    {this.props.isAnswerer ? (
                        <form className="thing-input-form" onSubmit={this.handleSubmitThing}>
                            <h2 className="thing-input-label" htmlFor="thing-input-box">
                                What are you thinking of?
                            </h2>
                            <h4>
                                (don't tell anyone!)
                            </h4>
                            <input
                                className="thing-input-box"
                                id="thing-input-box"
                                type="text"
                                onChange={this.handleThingChange}>
                            </input>
                            <button type="submit" disabled={this.state.thing === ""}>
                                Start game!
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
