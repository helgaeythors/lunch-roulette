import React from 'react';
import Button from '@material-ui/core/Button';
import SocketContext from '../../context/socketContext';
import NewRoomForm from '../NewRoomForm/NewRoomForm';

class FrontPage extends React.Component {
  render() {
    const { socket } = this.context;
    return (
        <>
            <NewRoomForm socket={socket}/>
        </>
    );
  }
};

FrontPage.contextType = SocketContext;

export default FrontPage;
