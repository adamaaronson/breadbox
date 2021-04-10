import React, { Component } from 'react'
import {BrowserRouter as Router, Link, Route, Redirect} from 'react-router-dom'
import db from '../services/firebase.js'

const ROOM_CODE_LENGTH = 5;

export default class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '', // The value of the username input text box
            roomCode: '', // The value of the room code input text box
            joiningRoom: false,
            settingUpGame: false
        }

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleRoomCodeChange = this.handleRoomCodeChange.bind(this);
        this.handleJoinRoomClick = this.handleJoinRoomClick.bind(this);
        this.handleCreateRoomClick = this.handleCreateRoomClick.bind(this);
        this.handleRoomCodeSubmit = this.handleRoomCodeSubmit.bind(this);
    }

    /* Text box edit handling */

    handleNameChange(event) {
        event.preventDefault();
        this.setState({
            name: event.target.value
        })
        this.props.onNameChange(this.state.name);
    }

    handleRoomCodeChange(event) {
        event.preventDefault();
        this.setState({
            roomCode: event.target.value
        })
    }

    generateID(length) {
        var result = [];
        var characters = '0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
        }
        return result.join('');
    }

    /* Creating a room */

    handleCreateRoomClick() {
        this.setState({
            settingUpGame: true
        })
        this.props.onNameChange(this.state.name);
        this.props.onSetAnswerer(true);

        // Create a new user ID
        // let userID = db.ref("users").push({
        //     name: this.state.name
        // }).key;
        // this.props.onSetUserID(userID);

        // Create a new room and add the user  
        let roomCode = this.generateID(ROOM_CODE_LENGTH);
        this.props.onSetRoomCode(roomCode);

        db.ref("games/" + roomCode).set({
            started: false,
            finished: false,
            answererID: null,
            memberIDs: [],
            questions: []
        })

        let userID = db.ref("games/" + roomCode + "/memberIDs").push({
            name: this.state.name
        }).key;
        
        let updates = {};
        updates["/games/" + roomCode + "/answererID"] = userID;
        db.ref().update(updates);

        this.props.onSetUserID(userID);
    }

    /* Joining a room */

    handleJoinRoomClick() {
        this.setState({
            joiningRoom: true
        })
        this.props.onNameChange(this.state.name);
    }

    // returns promise that is satisfied when room code is evaluated to valid or invalid
    isValidRoomCode(code) {
        return db.ref("games/" + code).once("value").then(
            snapshot => snapshot.exists()
        )
    }

    handleRoomCodeSubmit(event) {
        event.preventDefault()
        let code = this.state.roomCode;
        this.isValidRoomCode(code).then((isValid) => {
            if (isValid) {
                this.props.onSetRoomCode(code);
                
                // Add the user to the room
                let userID = db.ref("games/" + code + "/memberIDs").push({
                    name: this.state.name
                }).key;
                this.props.onSetUserID(userID);
     
                this.props.onSetAnswerer(false);
                this.setState({
                    settingUpGame: true
                })
            } else {
                alert("Invalid room code!")
            }
        })
        // TODO: add new user to database
        
    }

    render() {
        return (
            this.state.settingUpGame ? (
                <Redirect to="/setup" />
            ) : (
                <div className="welcome-page">
                    {/* Enter the user name */}
                    <form className="name-form">
                        <label htmlFor="enter-name">
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
                        <form className="room-code-form" onSubmit={this.handleRoomCodeSubmit}>
                            <label htmlFor="enter-room-code">
                                Enter room code:
                            </label>
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
                    }
                </div>
            )
        )
    }
}
