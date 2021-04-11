import React, { Component } from 'react'
import db from '../services/firebase.js'
import Header from '../components/Header.js'
import { BrowserRouter as Router, Link, Route, Redirect } from 'react-router-dom'
import '../css/Endgame.scss'

export default class Endgame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPlayers: [],
            winnerName: '',
            thing: '',
            nextAnswererSelected: false,
            prevAnswererID: '',
            firstLoad: true
        };

        this.setNextAnswerer = this.setNextAnswerer.bind(this)
    }

    async componentDidMount() {
        // Load in all the current players
        db.ref("games/" + this.props.roomCode + "/memberIDs").once("value", snapshot => {
            let players = []
            snapshot.forEach((person) => {
                players.push({
                    userID: person.key,
                    userName: person.val().name
                });
            })
            this.setState({
                currentPlayers: players
            })
        })

        // Load in the game winner
        db.ref("games/" + this.props.roomCode + "/winnerName").once('value', (snapshot) => {
            this.setState({
                winnerName: snapshot.val()
            })
        })

        // Load in the game "thing"
        db.ref("games/" + this.props.roomCode + "/thing").once('value', (snapshot) => {
            this.setState({
                thing: snapshot.val()
            })
        })

        // Load in the game "prevAnswererID"
        db.ref("games/" + this.props.roomCode + "/answererID").once('value', (snapshot) => {
            this.setState({
                prevAnswererID: snapshot.val()
            })
        })

        // Listen for when the next answerer is selected
        const answerIDRef = db.ref("games/" + this.props.roomCode + "/answererID");
        db.ref("games/" + this.props.roomCode + "/finished").on('value', (snapshot) => {
            answerIDRef.once('value', (snapshot) => {
                this.props.onSetAnswerer(snapshot.val() === this.props.userID);
            })
            
            if (!this.state.firstLoad) {
                this.setState({
                    nextAnswererSelected: true
                });
            }

            this.setState({
                firstLoad: false
            })
        })
    }

    componentWillUnmount() {
        db.ref("games/" + this.props.roomCode + "/finished").off();
    }

    setNextAnswerer(event) {
        event.preventDefault();

        let updates = {};
        updates["/games/" + this.props.roomCode + "/answererID/"] = event.target.value;
        updates["/games/" + this.props.roomCode + "/started"] = false;
        updates["/games/" + this.props.roomCode + "/finished"] = false;
        db.ref().update(updates);
    }

    render() {
        return this.state.nextAnswererSelected ? (
            <Redirect to="./setup" />
        ) : (
            <div className="game-page endgame-page">
                <Header />
                <h2 className="winner-announcement">
                    {this.state.winnerName} won the game!
                </h2>
                <h3 className="thing-announcement">
                    The answer was {this.state.thing}.
                </h3>

                {/* <h2>Current Players: </h2>
                {this.state.currentPlayers.map(player => (
                    <p key={player.userID}>{player.userName}</p>
                ))} */}

                {this.props.isAnswerer ? (
                    <div>
                        <h3 className="player-name-button-header">
                            Who's thinking of something next?
                        </h3>
                        <div>
                            {this.state.currentPlayers.map(player => (
                                <button
                                    className="player-name-button"
                                    value={player.userID}
                                    key={player.userID}
                                    onClick={this.setNextAnswerer}>
                                    {player.userName}
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div>
                        Waiting for the answerer to pick the next answer...
                    </div>
                )}
            </div>
        )
    }
}
