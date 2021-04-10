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
            userName: '',
            uid: '',
            roomCode: '',
            thing: '',
            isAnswerer: true,
            currentPlayers: []
        }

        this.setUserName = this.setUserName.bind(this);
        this.setThing = this.setThing.bind(this);
        this.setAnswerer = this.setAnswerer.bind(this);
        this.setRoomCode = this.setRoomCode.bind(this);
    }

    /* Functions for child components to control App state */

    setUserName(name) {
        this.setState({
            userName: name
        })
    }

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

    setThing(thing) {
        this.setState({
            thing: thing
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
                            onNameChange={this.setUserName}
                        />
                    )}/>

                    <Route exact path="/setup" render={() => (
                        <GameSetup
                            roomCode={this.state.roomCode}
                            isAnswerer={this.state.isAnswerer}
                            onSetThing={this.setThing}
                        />
                    )}/>
                    
                    <Route exact path="/game" render={() => (
                        this.state.isAnswerer ? (
                            <Answerer
                                thing={this.state.thing}
                            />
                        ) : (
                            <Guesser />
                        )
                    )}/>
                </div>
            </Router>
        )
    }
}