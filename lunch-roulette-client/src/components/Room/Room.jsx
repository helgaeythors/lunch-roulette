import React from 'react';

class Room extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            roomcode: null,
            userlist: [],
            oplist: [],
        };
    }
    componentDidMount = () => {
        const { socket } = this.props;

        socket.on('updateusers', (roomcode, userlist, oplist) => {
            this.setState({ roomcode: roomcode, userlist: userlist, oplist: oplist });
        });
    }
    render() {
        const { roomcode } = this.state;

        // if the server has not returned the roomcode
        if (roomcode === null || roomcode === undefined) {
            return <p>Waiting...</p>;
        }

        return (
            <p>Room Code: {roomcode}</p>
        );
    }
};

export default Room;
