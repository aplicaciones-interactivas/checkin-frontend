import Grid from "@material-ui/core/Grid";
import WarningIcon from '@material-ui/icons/Warning';
import Paper from "@material-ui/core/Paper";
import React from "react";
import PropTypes, {instanceOf} from "prop-types";
import {Cookies, withCookies} from "react-cookie";
import {withStyles} from "@material-ui/core";

const useStyles = theme => ({
    error: {
        backgroundColor: theme.palette.error.light,
        padding: theme.spacing(3, 2)
    }
});

class ErrorBox extends React.Component {

    render() {
        const {classes} = this.props;
        if (this.props.message) {
            return (<Paper className={classes.error}>
                <Grid container direction="row" alignItems="center" spacing={2}>
                    <Grid item>
                        <WarningIcon/>
                    </Grid>
                    <Grid item>
                        {this.props.message}
                    </Grid>
                </Grid>
            </Paper>);
        }
        return <span></span>;
    }


}

ErrorBox.propTypes = {
    classes: PropTypes.object.isRequired,
    cookies: instanceOf(Cookies).isRequired
};

export default withStyles(useStyles)(withCookies(ErrorBox));
