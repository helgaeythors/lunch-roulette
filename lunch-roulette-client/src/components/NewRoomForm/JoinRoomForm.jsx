import React from 'react';
import Button from '@material-ui/core/Button';

class JoinRoomForm extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        roomcode: "",
        username: "",
      };
  }
  handleJoin = () => {
    const { socket } = this.props;
    socket.emit('newuser', "NEWPERSON", function(confirmation) {
        if (confirmation) {
            console.log("success!");
        } else {
            console.log("error!");
        }
    });
  }
  render() {
    return (
        <>
            <Button variant="contained" color="primary" onClick={this.handleJoin}>
                Create a room
            </Button>
            <Button variant="contained" color="secondary" onClick={this.handleJoin}>
                Join a room
            </Button>
        </>
    );
  }
};

export default JoinRoomForm;
