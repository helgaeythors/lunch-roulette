import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
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
    render() {
        const { classes } = this.props;

        return (
            <>
                <div className="FrontPage-outer-container">
                    <div className="FrontPage-foodicon-container">
                        <FastfoodOutlinedIcon color="primary" />
                    </div>
                    <div className="FrontPage-inner-container">
                        <Link to="/create">
                            <Button 
                                variant="contained"
                                color="primary"
                                className={classes.buttonMargin}
                                startIcon={<AddCircleIcon />}
                            >
                                Create a room
                            </Button>
                        </Link>

                        <Link to="/join">
                            <Button 
                                variant="contained"
                                color="secondary"
                                className={classes.buttonMargin}
                                startIcon={<PersonAddIcon />}
                            >
                                Join a room
                            </Button>
                        </Link>
                        
                    </div>
                </div>
            </>
        );
    }
};

export default withStyles(styles)(FrontPage);
