import React from 'react';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles} from '@material-ui/core/styles';
import { styles } from '../../utils/customStyles';
import { ThemeProvider } from '@material-ui/core/styles';
import secondaryTheme from '../../utils/secondaryTheme';
import './Room.css';

class Room extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // fetch the roomcode from the url parameters
            roomcode: props.match.params.roomId,
            username: this.props.location.state ? this.props.location.state.username : undefined,
            ops: [],
            users: [],
            suggestion: "",
            numberOfSuggestions: 0,
            successSubmitting: false,
        };
    }
    componentDidMount = () => {
        const { socket } = this.props;
        const { roomcode } = this.state;

        // start listening for 'updateusers' events from the server
        socket.on('updateusers', (room, users, ops) => {
            // if the update applies to this room then update the state
            if (room === roomcode) {
                this.setState({ users: users, ops: ops });
            }
        });

        // start listening for 'updatesuggestions' events from the server
        socket.on('updatesuggestions', (room, suggestions) => {
            // if the update applies to this room then update the state
            if (room === roomcode) {
                this.setState({ numberOfSuggestions: suggestions.length });
            }
        });

        // TODO: later => fetch information from db here
    }
    componentWillUnmount() {
        const { socket } = this.props;

        // stop listening for events from the server
        socket.off("updateusers");
        socket.off("updatesuggestions");
    }
    handleChangeInput = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }
    handleSubmit = (event) => {
        event.preventDefault();

        const { roomcode, suggestion } = this.state;
        const { socket } = this.props;

        socket.emit('submitsuggestion', roomcode, suggestion, (success) => {
            if (success) {
                this.setState({ successSubmitting: true });
            }
        });
    }
    render() {
        const { classes } = this.props;
        const { username, roomcode, users, ops, suggestion, numberOfSuggestions, successSubmitting } = this.state;

        // if the user has not set its username
        if (!username) {
            return <p>Go to the <Link to="/">front page</Link> to join a room</p>;
        }

        // TODO: look into when starting to work with db
        // if the user has disconnected and is no longer in the room
        /* if (ops[username] === undefined && users[username] === undefined) {
            return <p>You have disconnected, go to the <Link to="/">front page</Link> to join a room</p>;
        } */

        return (
            <div className="Room-container">
                <div className="Room-header">
                    <p><span className="Room-header-info">{username}</span></p>
                    <p>Code: <span className="Room-header-info">{roomcode}</span></p>
                    <p>{numberOfSuggestions}<span className="Room-header-info"> / </span>{Object.keys(ops).length + Object.keys(users).length}</p>
                </div>
                <ThemeProvider theme={secondaryTheme}>
                    <div className="Room-main">

                        {successSubmitting ? <p>You have submitted!</p> :

                            <form onSubmit={this.handleSubmit}>
                                <div className="Room-form">
                                    <TextField id="CreateRoom-textfield"
                                        name="suggestion"
                                        label="Enter your suggestion..."
                                        variant="filled"
                                        color="secondary"
                                        className={classes.margin}
                                        value={suggestion}
                                        onChange={this.handleChangeInput}
                                    />
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        className={classes.margin}
                                        type="submit"
                                        disabled={suggestion === ""}
                                    >
                                        Submit
                                    </Button>
                                </div>
                            </form>
                        }
                    </div>
                </ThemeProvider>
            </div>
        );
    }
};

export default withStyles(styles)(Room);
