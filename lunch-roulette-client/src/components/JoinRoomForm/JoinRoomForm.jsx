import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles} from '@material-ui/core/styles';
import './JoinRoomForm.css';

const styles = () => ({
    buttonMargin: {
      margin: '5px',
    },
});

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
        const { classes } = this.props;

        return (
            <div className="JoinRoomForm-container">
                <Button 
                    variant="contained"
                    color="primary"
                    className={classes.buttonMargin}
                    onClick={this.handleJoin}>
                    Create a room
                </Button>
                
                <Button 
                    variant="contained"
                    color="secondary"
                    className={classes.buttonMargin}
                    onClick={this.handleJoin}>
                    Join a room
                </Button>
            </div>
        );
    }
};

export default withStyles(styles)(JoinRoomForm);
