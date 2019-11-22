import React from 'react';
import {withStyles} from "@material-ui/core";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AppBarMenu from "./AppBarMenu";

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
    customMouseIcon: {
        "&:hover": {
            cursor: 'pointer'
        }
    }
});

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        const location = window.location.pathname
        this.state = {
            location: location,
            anchorEl: null,
            mobileMoreAnchorEl: null
        }
    }

    render() {
        const {classes, className} = this.props;
        return (<AppBar position="fixed" className={className}>
            <div>{classes.title.flexGrow}</div>
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    <span className={classes.customMouseIcon} onClick={() => window.location.pathname = '/'}>
                    Check-In
                    </span>
                </Typography>
                <AppBarMenu/>
            </Toolbar>
        </AppBar>)
    }
}


NavBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar);
