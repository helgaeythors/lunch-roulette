import React from 'react';
import './CreateRoom.css';

class CreateRoom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            roomcode: "",
            username: "",
        };
    }
    handleJoin = () => {
        /* const { socket } = this.props;
        socket.emit('newuser', "NEWPERSON", function(confirmation) {
            if (confirmation) {
                console.log("success!");
            } else {
                console.log("error!");
            }
        }); */
    }
    render() {

        return (
            <div className="CreateRoom-container">
            </div>
        );
    }
};

export default CreateRoom;
