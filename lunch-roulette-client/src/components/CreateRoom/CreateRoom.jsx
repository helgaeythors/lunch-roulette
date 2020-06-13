import React from 'react';
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
        };
    }
    componentDidMount = () => {
        const { socket } = this.props;

        //let populate = this._populateUserList.bind(this);

        socket.on('updateusers', function(roomcode, userlist, oplist) {
            // populate()
            console.log(roomcode);
            console.log(userlist);
            console.log(oplist);
        });
    }
    handleChangeInput = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }
    handleSubmit = (event) => {
        event.preventDefault();

        const { username } = this.state;
        const { socket } = this.props;

        const that = this;
        socket.emit('newuser', username, function(available) {
            if (available) {
                // name avilable
                that.setState({ usernameError: false });
                socket.emit('joinroom', undefined);
            } else {
                // name not available
                that.setState({ usernameError: true });
            }
        });
    }
    render() {
        const { classes } = this.props;
        const { usernameError } = this.state;

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
