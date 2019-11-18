import React from 'react';
import {Box, Card, Link, Typography} from "@material-ui/core";
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
        [theme.breakpoints.down('sm')]: {
            height: '410px',
        },
        [theme.breakpoints.up('lg')]: {
            height: '240px'
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
    anchorNotUnderlined: {
        "&:hover": {
            cursor: 'pointer'
        },
    },
    linkContainer: {
        [theme.breakpoints.up('lg')]: {
            paddingLeft: '20px',
        },
        [theme.breakpoints.down('sm')]: {
            textAlign: 'center'
        },
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
        [theme.breakpoints.up('lg')]: {
            textAlign: 'left',
        },
    },
    paddingTypography: {
        [theme.breakpoints.up('lg')]: {
            paddingLeft: '5px'
        },

    },
    containerBorderButton: {
        [theme.breakpoints.up('lg')]: {
            borderLeft: '1px dotted grey',
            paddingLeft: theme.spacing(1)
        }
    }
});


class HotelBox extends React.Component {

    formatSearch(search) {
        return `?from=${search.from}&until=${search.until}&occupancy=${search.occupancy}`;
    }


    render() {
        const {classes, hotel, search} = this.props;
        return (
            <Card
                className={classes.card}>
                <CardContent>
                    <Grid container>
                        <Grid item align={'center'} xs={12} lg={3}>
                            <Grid item xs={3} lg={12}>
                                <HotelImage isGrid={true} images={hotel.__hotelImages__}/>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} lg={7} className={classes.linkContainer}>
                            <Link href={`/HotelDetails/${hotel.id}${this.formatSearch(search)}`} underline={'none'} className={classes.anchorNotUnderlined} children={
                                <Typography className={classes.paddingTypography}>{hotel.name}</Typography>
                            }/>
                            <Grid xs={12} lg={7}>
                                <Rating value={hotel.stars} size={'large'} readOnly/> 
                            </Grid> 
                            <Grid xs={12} lg={7}>
                                <AmenityList amenities={hotel.amenities}/>
                            </Grid>
                        </Grid>
                        <Grid className={classes.containerBorderButton} container xs={12} lg={2} align="center"
                              justify="center" alignItems={'center'} direction="row">
                            <Grid item xs={12}>
                                <Grid item xs={12}>Reserva ya por</Grid>
                                <Grid item xs={12}>
                                    <Price hotelId={hotel.id} from={search.from} until={search.until}
                                           occupancy={search.occupancy}/>
                                </Grid>
                                <Button className={classes.masInfoButton}
                                        href={`/HotelDetails/${hotel.id}${this.formatSearch(search)}`}
                                        variant="contained" color="primary">
                                    Mas Info
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>

            </Card>
        );
    }

}


HotelBox.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HotelBox);

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
