import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles} from '@material-ui/core/styles';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import FastfoodOutlinedIcon from '@material-ui/icons/FastfoodOutlined';
import './FrontPage.css';

const styles = () => ({
    buttonMargin: {
      margin: '5px',
    },
});

class FrontPage extends React.Component {
    handleCreate = () => {
        const { socket } = this.props;
        socket.emit('newuser', "NEWPERSON!", function(confirmation) {
            if (confirmation) {
                console.log("success!");
            } else {
                console.log("error!");
            }
        });
    }
    handleJoin = () => {
        /*  */
     }
    render() {
        const { classes } = this.props;

        return (
            <>
                <div className="FrontPage-outer-container">
                    <div className="FrontPage-foodicon-container">
                        <FastfoodOutlinedIcon color="primary" />
                    </div>
                    <div className="FrontPage-inner-container">
                        <Button 
                            variant="contained"
                            color="primary"
                            className={classes.buttonMargin}
                            onClick={this.handleCreate}
                            startIcon={<AddCircleIcon />}
                        >
                            Create a room
                        </Button>
                        
                        <Button 
                            variant="contained"
                            color="secondary"
                            className={classes.buttonMargin}
                            onClick={this.handleJoin}
                            startIcon={<PersonAddIcon />}
                        >
                            Join a room
                        </Button>
                    </div>
                </div>
            </>
        );
    }
};

export default withStyles(styles)(FrontPage);
