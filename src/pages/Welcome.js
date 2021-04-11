import '../css/Welcome.scss'
import React, { Component } from 'react'
import Header from '../components/Header.js'
import {BrowserRouter as Router, Link, Route, Redirect} from 'react-router-dom'
import db from '../services/firebase.js'

const ROOM_CODE_LENGTH = 5;

export default class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            roomCode: '',
            joiningRoom: false,
            settingUpGame: false
        }

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleNameSubmit = this.handleNameSubmit.bind(this);
        this.handleRoomCodeChange = this.handleRoomCodeChange.bind(this);
        this.handleCreateRoomClick = this.handleCreateRoomClick.bind(this);
        this.handleJoinRoomClick = this.handleJoinRoomClick.bind(this);
        this.handleRoomCodeSubmit = this.handleRoomCodeSubmit.bind(this);
    }

    handleNameChange(event) {
        event.preventDefault();
        this.setState({
            name: event.target.value
        })
    }

    handleNameSubmit(event) {
        event.preventDefault();
    }

    handleRoomCodeChange(event) {
        event.preventDefault();
        this.setState({
            roomCode: event.target.value
        })
    }

    /**
     * Generates a random room code
     */
    generateID(length) {
        var result = [];
        var characters = '0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
        }
        return result.join('');
    }

    /**
     * Creates a new game room and adds the user.
     */
    handleCreateRoomClick() {
        // Create a new room
        let roomCode = this.generateID(ROOM_CODE_LENGTH);
        db.ref("games/" + roomCode).set({
            started: false,
            finished: false,
            answererID: null,
            memberIDs: [],
            questions: []
        })

        // Create a new ID for the current user
        let userID = db.ref("games/" + roomCode + "/memberIDs").push({
            name: this.state.name
        }).key;
        
        // Add that user ID to the game
        let updates = {};
        updates["/games/" + roomCode + "/answererID"] = userID;
        db.ref().update(updates);

        this.props.onSetUserID(userID);
        this.props.onSetUserName(this.state.name);
        this.props.onSetRoomCode(roomCode);

        this.props.onSetAnswerer(true);
        this.setState({
            settingUpGame: true
        })
    }

    /**
     * When the user hits "join room", displays the room ID text box.
     */
    handleJoinRoomClick() {
        this.setState({
            joiningRoom: true
        })
    }

    // Returns a promise that is satisfied when room code is evaluated to valid or invalid
    isValidRoomCode(code) {
        return db.ref("games/" + code).once("value").then(
            snapshot => snapshot.exists()
        )
    }

    /**
     * Creates a new user and adds them to an existing room
     */
    handleRoomCodeSubmit(event) {
        event.preventDefault()
        let code = this.state.roomCode;
        this.isValidRoomCode(code).then((isValid) => {
            if (isValid) {
                // Add the user to the room
                let userID = db.ref("games/" + code + "/memberIDs").push({
                    name: this.state.name
                }).key;

                this.props.onSetRoomCode(code);
                this.props.onSetUserID(userID);
                this.props.onSetUserName(this.state.name);
                this.props.onSetAnswerer(false);
                this.setState({
                    settingUpGame: true
                })
            } else {
                alert("Invalid room code!")
            }
        })    
    }

    render() {
        return (
            this.state.settingUpGame ? (
                <Redirect to="/setup" />
            ) : (
                <div className="welcome-page-wrapper">
                    <div className="welcome-page">
                        <Header />
                        <p className="game-description">
                            Play Twenty Questions online with your friends!
                        </p>
                        {/* Enter the user name */}
                        <form className="name-form" onSubmit={this.handleNameSubmit}>
                            <label htmlFor="enter-name" className="enter-name-label">
                                What's your name?
                            </label>
                            <input
                                className="enter-name"
                                id="enter-name"
                                type="text"
                                onChange={this.handleNameChange}>
                            </input>
                        </form>

                        {/* Create a new room, only if a name is entered */}
                        <button
                            className="create-room"
                            disabled={this.state.name === ''}
                            onClick={this.handleCreateRoomClick}>
                            Create new room
                        </button>

                        {/* Join an existing room, only if a name is entered. 
                            Prompts entry of a join code */}
                        <button
                            className="join-room"
                            disabled={this.state.name === ''}
                            onClick={this.handleJoinRoomClick}>
                            Join room
                        </button>

                        {/* Joins an existing room upon join code entry. */}
                        
                        {this.state.joiningRoom &&
                        <>
                            <div className="enter-room-code-label">
                                Enter room code:
                            </div>
                            <form className="room-code-form" onSubmit={this.handleRoomCodeSubmit}>
                                <input
                                    className="enter-room-code"
                                    id="enter-room-code"
                                    type="text"
                                    onChange={this.handleRoomCodeChange}>
                                </input>
                                <button
                                    type="submit"
                                    className="room-code-button" disabled={this.state.roomCode === ""}>
                                    Submit
                                </button>
                            </form>
                        </>
                        }
                    </div>
                </div>
            )
        )
    }
}
