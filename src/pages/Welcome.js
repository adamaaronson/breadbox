import React, { Component } from 'react'
import {BrowserRouter as Router, Link, Route, Redirect} from 'react-router-dom'

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

    /* Creating a room */

    handleCreateRoomClick() {
        // TODO: generate room code
        this.setState({
            settingUpGame: true
        })
        this.props.onNameChange(this.state.name);
        this.props.onSetRoomCode("code");
        this.props.onSetAnswerer(true);
    }

    /* Joining a room */

    handleJoinRoomClick() {
        this.setState({
            joiningRoom: true
        })
        this.props.onNameChange(this.state.name);
    }

    isValidRoomCode(code) {
        // TODO: use database stuff to determine whether code is valid
        return true;
    }

    handleRoomCodeSubmit(event) {
        event.preventDefault()
        let code = this.state.roomCode;
        if (this.isValidRoomCode(code)) {
            this.props.onSetRoomCode(code);
            this.props.onSetAnswerer(false);
            this.setState({
                settingUpGame: true
            })
        }
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
