import React, { Component } from 'react'
import db from '../services/firebase.js'

export default class Endgame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPlayers: []
        };
    }

    async componentDidMount() {
        // Load in all the current players with once
        db.ref("games/" + this.props.roomCode + "/memberIDs").on('value', (snapshot) => {
            console.log(snapshot);
            snapshot.forEach((player) => {
                console.log(player)
                this.setState({
                    currentPlayers: [...this.state.currentPlayers, {
                        userID: player.key,
                        userName: player.val().name
                    }]
                });
            })
        })
    }
    
    setNextAnswerer(player) {
        this.props.onSetNextAnswerer()
    }

    render() {
        return (
            <div>
                <h2>{this.props.winner} won the game!</h2>
                <h2>The thing was {this.props.thing}</h2>

                {this.props.isAnswerer ? (
                    <div>
                        <h3>Pick the next answerer:</h3>
                        {this.state.currentPlayers.map(player => (
                            <button onClick={this.setNextAnswerer(player)}>
                                {player.userName}
                            </button>
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
