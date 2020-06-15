import React from 'react';
import { Redirect } from 'react-router'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles} from '@material-ui/core/styles';
import { styles } from '../../utils/customStyles';
import './JoinRoom.css';

class JoinRoom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            usernameError: false,
            shouldRedirect: false,
            roomcode: null,
            roomcodeError: false,
        };
    }
    handleChangeInput = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }
    handleSubmit = (event) => {
        event.preventDefault();

        const { username } = this.state;
        const { socket } = this.props;

        socket.emit('newuser', username, (available) => {
            const { roomcode } = this.state;

            if (available) {
                // name avilable
                this.setState({ usernameError: false });
                socket.emit('joinroom', roomcode, (success) => {
                    if (success) {
                        this.setState({ roomcodeError: false, shouldRedirect: true });
                    }
                    else {
                        this.setState({ roomcodeError: true });
                    }
                });
            } else {
                // name not available
                this.setState({ usernameError: true });
            }
        });
    }
    render() {
        const { classes } = this.props;
        const { username, usernameError, roomcode, roomcodeError, shouldRedirect } = this.state;

        if (shouldRedirect) {
            return <Redirect to={{
                pathname: `room/${roomcode}`,
                state: { username: username }
            }} />;
        }

        return (
            <div className="JoinRoom-container">
                <form onSubmit={this.handleSubmit}>
                    <div className="JoinRoom-form">
                        <TextField id="JoinRoom-textfield-roomcode"
                            name="roomcode"
                            label="Enter the room code..."
                            variant="filled"
                            color="primary"
                            className={classes.margin}
                            onChange={this.handleChangeInput}
                            error={roomcodeError}
                            helperText={roomcodeError ? "Room not available" : ""}
                        />
                        <TextField id="JoinRoom-textfield-username"
                            name="username"
                            label="Enter your name..."
                            variant="filled"
                            color="primary"
                            className={classes.margin}
                            onChange={this.handleChangeInput}
                            error={usernameError}
                            helperText={usernameError ? "Name unavailable" : ""}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.margin}
                            type="submit"
                            disabled={username === ""}
                        >
                            Join
                        </Button>
                    </div>
                </form>
            </div>
        );
    }
};

export default withStyles(styles)(JoinRoom);
