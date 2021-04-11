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
            userName: '',
            roomCode: '',
            thing: '', // TODO: Should we put this in the DB instead?
            isAnswerer: true,
        }

        this.submitThing = this.submitThing.bind(this);
        this.setAnswerer = this.setAnswerer.bind(this);
        this.setRoomCode = this.setRoomCode.bind(this);
        this.setUserID = this.setUserID.bind(this);
        this.setUserName = this.setUserName.bind(this);
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

    setUserName(userName) {
        this.setState({
            userName: userName
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
                            onSetUserName={this.setUserName}
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
                                userName={this.state.userName}
                                roomCode={this.state.roomCode}
                                thing={this.state.thing}
                            />
                        ) : (
                            <Guesser
                                userID={this.state.userID}
                                userName={this.state.userName}
                                roomCode={this.state.roomCode}
                            />
                        )
                    )}/>
                </div>
            </Router>
        )
    }
}