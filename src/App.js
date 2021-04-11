import './css/App.scss'
import React, { Component } from 'react'
import {BrowserRouter as Router, Route } from 'react-router-dom'
import Welcome from './pages/Welcome.js'
import GameSetup from './pages/GameSetup.js'
import Guesser from './pages/Guesser.js'
import Answerer from './pages/Answerer.js'
import Endgame from './pages/Endgame.js'

const IS_DEPLOY = false;
const PATH_PREFIX = "/breadbox";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userID: '',
            userName: '',
            roomCode: '',
            isAnswerer: true,
        }

        this.setAnswerer = this.setAnswerer.bind(this);
        //this.setNextAnswerer = this.setNextAnswerer.bind(this);
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

    // setNextAnswerer(nextAnswerer) {
    //     if (nextAnswerer.userID === this.state.userID) {
    //         this.setState({
    //             isAnswerer: true
    //         })
    //     } else {
    //         this.setState({
    //             isAnswerer: false
    //         })
    //     }
    // }

    setRoomCode(roomCode) {
        this.setState({
            roomCode: roomCode
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

    getRealPath(basicPath) {
        if (IS_DEPLOY) {
            return PATH_PREFIX + basicPath
        } else {
            return basicPath
        }
    }

    render() {
        return (
            <Router>
                <div className="app">
                    <Route exact path={this.getRealPath("/")} render={() => (
                        <Welcome
                            onSetRoomCode={this.setRoomCode}
                            onSetAnswerer={this.setAnswerer}
                            onSetUserID={this.setUserID}
                            onSetUserName={this.setUserName}
                        />
                    )}/>

                    <Route exact path={this.getRealPath("/setup")} render={() => (
                        <GameSetup
                            roomCode={this.state.roomCode}
                            isAnswerer={this.state.isAnswerer}
                        />
                    )}/>
                    
                    <Route exact path={this.getRealPath("/game")} render={() => (
                        this.state.isAnswerer ? (
                            <Answerer
                                userID={this.state.userID}
                                userName={this.state.userName}
                                roomCode={this.state.roomCode}
                            />
                        ) : (
                            <Guesser
                                userID={this.state.userID}
                                userName={this.state.userName}
                                roomCode={this.state.roomCode}
                            />
                        )
                    )}/>
                    <Route exact path={this.getRealPath("/end")} render={() => (
                        <Endgame
                            roomCode={this.state.roomCode}
                            isAnswerer={this.state.isAnswerer}
                            thing={this.state.thing}
                            userID={this.state.userID}
                            isPreviousAnswerer={this.state.isAnswerer}
                            onSetAnswerer={this.setAnswerer}
                        />
                    )}/>
                </div>
            </Router>
        )
    }
}