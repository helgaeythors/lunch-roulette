import React from 'react';
import { Redirect } from 'react-router'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles} from '@material-ui/core/styles';
import { styles } from '../../utils/customStyles';
import './CreateRoom.css';

class CreateRoom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            usernameError: false,
            shouldRedirect: false,
            roomcode: null,
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
            if (available) {
                // name avilable
                socket.emit('joinroom', undefined, (roomcode) => {
                    this.setState({ usernameError: false, roomcode: roomcode, shouldRedirect: true });
                });
            } else {
                // name not available
                this.setState({ usernameError: true });
            }
        });
    }
    render() {
        const { classes } = this.props;
        const { username, usernameError, shouldRedirect, roomcode } = this.state;

        if (shouldRedirect) {
            return <Redirect to={`room/${roomcode}`}/>;
        }

        return (
            <div className="CreateRoom-container">
                <form onSubmit={this.handleSubmit}>
                    <div className="CreateRoom-form">
                        <TextField id="CreateRoom-textfield"
                            name="username"
                            label="Enter your name..."
                            variant="filled"
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
                            Create
                        </Button>
                    </div>
                </form>
            </div>
        );
    }
};

export default withStyles(styles)(CreateRoom);
