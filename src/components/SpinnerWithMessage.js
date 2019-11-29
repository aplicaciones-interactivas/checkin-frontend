import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
    spinner: {
        marginTop: theme.spacing(5)
    },
});

class SpinnerWithMessage extends React.Component {

    render() {
        const {classes, message} = this.props;
        return (<Grid align={'center'} className={classes.spinner} container xs={12}>
            <Grid item xs={12}>
                <CircularProgress/>
            </Grid>
            <Grid xs={12}>
                {message}
            </Grid>
        </Grid>);
    }
}

SpinnerWithMessage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SpinnerWithMessage);
