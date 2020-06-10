import React from 'react';
import SocketContext from '../../context/socketContext';
import NewRoomForm from '../NewRoomForm/JoinRoomForm';

class FrontPage extends React.Component {
  render() {
    const { socket } = this.context;
    return <NewRoomForm socket={socket}/>;
  }
};

FrontPage.contextType = SocketContext;

export default FrontPage;
