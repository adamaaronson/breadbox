import React, { Component } from 'react'
import db from '../services/firebase.js'
import Header from '../components/Header.js'

export default class Endgame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPlayers: [],
            winnerName: '',
            thing: '',
            nextAnswererSelected: false
        };
    }

    async componentDidMount() {
        // Load in all the current players
        db.ref("games/" + this.props.roomCode + "/memberIDs").on("value", snapshot => {
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
        db.ref("games/" + this.props.roomCode + "/winnerName").on('value', (snapshot) => {
            this.setState({
                winnerName: snapshot.val()
            })
        })

        // Load in the game "thing"
        db.ref("games/" + this.props.roomCode + "/thing").on('value', (snapshot) => {
            this.setState({
                thing: snapshot.val()
            })
        })

        // Listen for when the next answerer is selected
        db.ref("games/" + this.props.roomCode + "/answererID").on('value', (snapshot) => {
            const newAnswererID = snapshot.val();
            if (newAnswererID != this.props.userID) {
                this.setState({
                    nextAnswererSelected: true
                })
            }
        })
    }

    setNextAnswerer(event) {
        event.preventDefault();

        let updates = {};
        updates["/games/" + this.props.roomCode + "/answererID/"] = event.target.value;
        db.ref().update(updates);
    }

    render() {
        return (
            <div className="game-page endgame-page">
                <Header />
                <h2>{this.state.winner} won the game!</h2>
                <h2>The thing was {this.state.thing}</h2>
                <h2>Current Players: </h2>
                {this.state.currentPlayers.map(player => (
                    <p key={player.userID}>{player.userName}</p>
                ))}

                {this.props.isAnswerer ? (
                    <div>
                        <h3>Pick the next answerer:</h3>
                        {this.state.currentPlayers.map(player => (
                            <button value={player.userID} key={player.userID} onClick={this.setNextAnswerer}>{player.userName}</button>
                        ))}
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
