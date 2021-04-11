import React, { Component } from 'react'
import db from '../services/firebase.js'

export default class Endgame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPlayers: [],
            winnerName: '',
            thing: ''
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
    }

    setNextAnswerer(player) {
        this.props.onSetNextAnswerer(player)
    }

    render() {
        return (
            <div>
                <h2>{this.state.winnerName} won the game!</h2>
                <h2>The thing was {this.state.thing}</h2>
                <h2>Current Players: </h2>
                {this.state.currentPlayers.map(player => (
                    <p key={player.userID}>{player.userName}</p>
                ))}

                {this.props.isAnswerer ? (
                    <div>
                        <h3>Pick the next answerer:</h3>
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
