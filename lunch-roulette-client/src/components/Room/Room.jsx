import React from 'react';
import { Link } from 'react-router-dom';
import './Room.css';

class Room extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // fetch the roomcode from the url parameters
            roomcode: props.match.params.roomId,
            username: this.props.location.state ? this.props.location.state.username : undefined,
            ops: [],
            users: [],
        };
    }
    componentDidMount = () => {
        const { socket } = this.props;
        const { roomcode } = this.state;

        // start listening for 'updateusers' events from the server
        socket.on('updateusers', (room, users, ops) => {
            // if the update applies to this room then update the state
            if (room === roomcode) {
                this.setState({ users: users, ops: ops });
            }
        });

        // TODO: later => fetch information from db here
    }
    componentWillUnmount() {
        const { socket } = this.props;

        // stop listening for 'updateusers' events from the server
        socket.off("updateusers");
    }
    render() {
        const { username, roomcode, users, ops } = this.state;

        // if the user has not set its username
        if (!username) {
            return <p>Go to the <Link to="/">front page</Link> to join a room</p>;
        }

        // if the user has disconnected and is no longer in the room
        if (ops[username] === undefined && users[username] === undefined) {
            console.log("disconnected: ");
            console.log(username);
            return <p>You have disconnected, go to the <Link to="/">front page</Link> to join a room</p>;
        }

        return (
            <>
                <p>Username: {username}</p>
                <p>Room Code: {roomcode}</p>
                <p>Number of users: {Object.keys(ops).length + Object.keys(users).length}</p>
            </>
        );
    }
};

export default Room;
