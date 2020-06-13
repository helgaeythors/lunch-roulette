import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { withStyles} from '@material-ui/core/styles';
import { styles } from '../../utils/customStyles';
import './FrontPage.css';

class FrontPage extends React.Component {
    render() {
        const { classes } = this.props;

        return (
            <>
                <div className="FrontPage-container">
                <Button 
                    variant="contained"
                    color="primary"
                    className={classes.margin}
                    startIcon={<AddCircleIcon />}
                    component={Link}
                    to="/create">
                    Create a room
                </Button>

                <Button 
                    variant="contained"
                    color="secondary"
                    className={classes.margin}
                    startIcon={<PersonAddIcon />}
                    component={Link}
                    to="join">
                    Join a room
                </Button>
                    
                </div>
            </>
        );
    }
};

export default withStyles(styles)(FrontPage);
