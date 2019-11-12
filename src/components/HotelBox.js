import React from 'react';
import {Card} from "@material-ui/core";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import {red} from "@material-ui/core/colors";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";

const styles = theme => ({
    card: {
        maxWidth: '100%',
        [theme.breakpoints.up('lg')]: {
            marginLeft: theme.spacing(2),
            marginRight: theme.spacing(1)
        }
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
});

class HotelBox extends React.Component {

    render() {
        const {classes} = this.props;
        return (
            <Card className={classes.card}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            R
                        </Avatar>
                    }
                    title="Shrimp and Chorizo Paella"
                    subheader="September 14, 2016"
                />

            </Card>
        );
    }
}


HotelBox.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HotelBox);
