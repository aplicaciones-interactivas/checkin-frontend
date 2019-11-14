import React from 'react';
import {Card, Link, Typography} from "@material-ui/core";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import {red} from "@material-ui/core/colors";
import HotelImage from "./HotelImage";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Rating from "@material-ui/lab/Rating";
import {AmenityList} from "./AmenityList";
import Price from "./Price";
import Button from "@material-ui/core/Button";
import th from "moment/locale/th";

const styles = theme => ({
    card: {
        maxWidth: '100%',
        [theme.breakpoints.up('lg')]: {
            marginLeft: theme.spacing(2),
            marginRight: theme.spacing(1),
            marginBottom: theme.spacing(0),
            marginTop: theme.spacing(0),
        }
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
    anchorNotUnderlined: {
        "&:hover": {
            cursor: 'pointer'
        }
    },
    masInfoButton: {
        marginTop: theme.spacing(1),
        width: '100%'
    },
    imageSize: {
        [theme.breakpoints.down('sm')]: {
            maxWidth: '30%'
        },
        verticalAlign: 'top'
    },

    hotelGrid: {
        [theme.breakpoints.down('sm')]: {
            textAlign: 'center',
        },
        [theme.breakpoints.up('md')]: {
            textAlign: 'left',
        },
    }
});

/*
 <CardContent>
                    <Grid container className={classes.hotelGrid} align={'left'} justify={'left'}>
                        <Grid align={'center'} item xs={12} md={3}>
                            <HotelImage isGrid={true} images={hotel.__hotelImages__}/>
                        </Grid>
                    </Grid>
                </CardContent>
                <Grid item xs={12}>
                    <Link underline={'none'} className={classes.anchorNotUnderlined} children={
                        <Typography>{hotel.name}</Typography>
                    }/>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Rating value={hotel.stars} size={'large'} readOnly/>
                </Grid>
                <Grid item xs={12} md={12}>
                    <AmenityList amenities={hotel.amenities}/>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Price hotelId={hotel.id} from={search.from} until={search.until}
                           occupancy={search.occupancy}/>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Button className={classes.masInfoButton} variant="contained" color="primary">
                        + Mas Info
                    </Button>
                </Grid>
                 */

class HotelBox extends React.Component {

    render() {
        const {classes, hotel, search} = this.props;
        return (
            <Card className={classes.card}>
                ddfsdfsdfsdf
            </Card>
        );
    }
}


HotelBox.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HotelBox);
