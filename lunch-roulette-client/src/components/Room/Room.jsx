import React from 'react';

class Room extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // fetch the roomcode from the url parameters
            roomcode: props.match.params.roomId,
            ops: [],
            users: [],
        };
    }
    componentDidMount = () => {
        const { socket } = this.props;

        // start listening for 'updateusers' events from the server
        socket.on('updateusers', (roomcode, users, ops) => {
            this.setState({ roomcode: roomcode, users: users, ops: ops });
        });

        // TODO later: => fetch information from db here
    }
    componentWillUnmount() {
        const { socket } = this.props;

        // stop listening for 'updateusers events from the server
        socket.off("updateusers");
    }
    render() {
        const { roomcode, users, ops } = this.state;

        return (
            <>
                <p>Room Code: {roomcode}</p>
                <p>Number of users: {Object.keys(ops).length + Object.keys(users).length}</p>
            </>
        );
    }
};

export default Room;
