import React from 'react';
import Button from '@material-ui/core/Button';

class NewRoomForm extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        roomcode: "",
        username: "",
      };
  }
  handleCreate = () => {
    const { socket } = this.props;
    socket.emit('newuser', {/* TODO */}, function(confirmation) {
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
            <Button variant="contained" color="secondary" onClick={this.handleCreate}>
                Newroom
            </Button>
        </>
    );
  }
};

export default NewRoomForm;
