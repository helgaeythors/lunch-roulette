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
            validUserName: false,
            shouldRedirect: false,
            roomcode: "",
            roomcodeError: false,
        };
    }
    handleChangeInput = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const { validUserName } = this.state;

        if (!validUserName) {
            this.handleNewUser();
        } else{
            this.handleJoinRoom();
        }
    }
    handleNewUser = () => {
        const { username } = this.state;
        const { socket } = this.props;

        socket.emit('newuser', username, (available) => {
            if (available) {
                // name avilable
                this.setState({ usernameError: false, validUserName: true });
            } else {
                // name not available
                this.setState({ usernameError: true, validUserName: false });
            }
        });
    }
    handleJoinRoom = () => {
        const { roomcode } = this.state;
        const { socket } = this.props;

        socket.emit('joinroom', roomcode, (success) => {
            if (success) {
                this.setState({ roomcodeError: false, shouldRedirect: true });
            }
            else {
                this.setState({ roomcodeError: true, shouldRedirect: false });
            }
        });
    }
    render() {
        const { classes } = this.props;
        const { username, usernameError, validUserName, roomcode, roomcodeError, shouldRedirect } = this.state;

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
                        {!validUserName ?
                        <>
                            <TextField id="JoinRoom-textfield-username"
                                name="username"
                                label="Enter your name..."
                                value={username}
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
                                disabled={username === ""}
                                onClick={this.handleNewUser}
                                type="button"
                            >
                                Continue
                            </Button>
                        </> :
                        <>
                            <TextField id="JoinRoom-textfield-roomcode"
                                name="roomcode"
                                label="Enter the room code..."
                                value={roomcode}
                                variant="filled"
                                color="primary"
                                className={classes.margin}
                                onChange={this.handleChangeInput}
                                error={roomcodeError}
                                helperText={roomcodeError ? "Room not available" : ""}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.margin}
                                disabled={username === ""}
                                onClick={this.handleJoinRoom}
                                type="button"
                            >
                                Join
                            </Button>
                        </>}
                    </div>
                </form>
            </div>
        );
    }
};

export default withStyles(styles)(JoinRoom);
