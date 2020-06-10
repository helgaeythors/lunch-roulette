import React from 'react';
import SocketContext from '../../context/socketContext';
import JoinRoomForm from '../JoinRoomForm/JoinRoomForm';

class FrontPage extends React.Component {
    render() {
        const { socket } = this.context;

        return <JoinRoomForm socket={socket}/>;
    }
};

FrontPage.contextType = SocketContext;

export default FrontPage;
