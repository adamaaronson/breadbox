import './css/App.css'
import React, { Component } from 'react'
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom'
import Welcome from './pages/Welcome.js'
import GameSetup from './pages/GameSetup.js'
import Guesser from './pages/Guesser.js'
import Answerer from './pages/Answerer.js'

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userID: '',
            roomCode: '',
            thing: '', // TODO: Should we put this in the DB instead?
            isAnswerer: true,
        }

        this.submitThing = this.submitThing.bind(this);
        this.setAnswerer = this.setAnswerer.bind(this);
        this.setRoomCode = this.setRoomCode.bind(this);
        this.setUserID = this.setUserID.bind(this);
    }

    /* Functions for child components to control App state */

    setAnswerer(isAnswerer) {
        this.setState({
            isAnswerer: isAnswerer
        })
    }

    setRoomCode(roomCode) {
        this.setState({
            roomCode: roomCode
        })
    }

    submitThing(thing) {
        this.setState({
            thing: thing
        })
    }

    setUserID(userID) {
        this.setState({
            userID: userID
        })
    }

    render() {
        return (
            <Router>
                <div className="app">
                    <h1 className="title">
                        Breadbox
                    </h1>

                    <Route exact path="/" render={() => (
                        <Welcome
                            onSetRoomCode={this.setRoomCode}
                            onSetAnswerer={this.setAnswerer}
                            onSetUserID={this.setUserID}
                        />
                    )}/>

                    <Route exact path="/setup" render={() => (
                        <GameSetup
                            roomCode={this.state.roomCode}
                            isAnswerer={this.state.isAnswerer}
                            onSubmitThing={this.submitThing}
                        />
                    )}/>
                    
                    <Route exact path="/game" render={() => (
                        this.state.isAnswerer ? (
                            <Answerer
                                userID={this.state.userID}
                                thing={this.state.thing}
                            />
                        ) : (
                            <Guesser
                                userID={this.state.userID}
                            />
                        )
                    )}/>
                </div>
            </Router>
        )
    }
}