import React from 'react';
import {Card, CardContent, Link, Typography} from "@material-ui/core";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import SnackbarContentWrapper from "./SnackbarContentWrapper";
import Grid from "@material-ui/core/Grid";
import HotelImage from "./HotelImage";
import CircularProgress from "@material-ui/core/CircularProgress";
import HotelBox from "./HotelBox";

const styles = theme => ({
    hotelRow: {
        margin: theme.spacing(1),
    },
    spinner: {
        marginTop: theme.spacing(5)
    },
    snackBar: {
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        width: '100%'
    }
});


class HotelsList extends React.Component {

    render() {
        const {classes, hotels, search} = this.props;
        if (hotels) {
            if (hotels.length === 0) {
                return (<SnackbarContentWrapper message={"No encontramos ningun hotel disponible"}
                                                variant={'warning'}></SnackbarContentWrapper>);
            } else {
                return hotels.map(hotel => {
                    return (
                        <Grid className={classes.hotelRow} item xs={12}>
                            <HotelBox hotel={hotel} search={search}/>
                        </Grid>
                    )
                });
            }
        } else {
            return <Grid align={'center'} className={classes.spinner} item xs={12}><CircularProgress/></Grid>;
        }
    }
}


HotelsList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HotelsList);
