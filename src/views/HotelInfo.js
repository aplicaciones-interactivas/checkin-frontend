import React from 'react';
import HotelImage from '../components/HotelImage';
import Grid from "@material-ui/core/Grid";
import {CheckinHotelApi} from "../api/CheckinHotelApi";
import {withStyles} from '@material-ui/styles';
import {AmenityList} from "../components/AmenityList";
import Rating from "@material-ui/lab/Rating";
import PropTypes from "prop-types";
import RoomList from '../components/Table';
import {Card, Typography} from "@material-ui/core";
import HotelNameLocation from "../components/HotelNameLocation";
import CheckinPlacesApi from "../api/CheckinPlacesApi";
import Box from "@material-ui/core/Box";
import CheckInRoomTypeApi from "../api/CheckInRoomTypeApi";
import NavBar from "../components/NavBar";


const styles = theme => ({
    fullWidth: {
        width: '100%'
    }
});

class HotelInfo extends React.Component {

    constructor(props) {
        super(props);
        this.hotelApi = new CheckinHotelApi();
        this.placesApi = new CheckinPlacesApi();
        this.roomTypeApi = new CheckInRoomTypeApi();
        this.state = {search: this.props.location.state}
        this.componentDidMount = this.componentDidMount.bind(this)
    }

    componentDidMount() {
        const {hotelId} = this.props.match.params;
        const {from, until, occupancy} = this.state.search;

        this.hotelApi.getById(hotelId)
            .then(data => {
                this.setState({hotel: data});
                return data;
            }).then(data => {
            this.placesApi.getCountryByCode(data.country)
                .then(countryInfo => {
                    this.setState({country: countryInfo.translations.es});
                });
        });
        this.roomTypeApi.findAvailableForHotelId(hotelId, from, until, occupancy)
            .then(roomTypes => this.setState({roomTypes: roomTypes}));
    }

    render() {
        if (this.state.hotel && this.state.country && this.state.roomTypes) {
            const {classes} = this.props;
            return (<span><NavBar/>
                <Grid container xs={12} align={'center'} justify={'center'}>
                    <Grid item direction="column" xs={10}>

                        <Grid container xs={12} align={'left'}>
                            <Box p={2} className={classes.fullWidth}>
                                <Grid item xs={12}>
                                    <HotelImage isGrid={true}
                                                images={this.state.hotel ? this.state.hotel.__hotelImages__ : []}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <HotelNameLocation hotel={this.state.hotel} country={this.state.country}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <Rating value={this.state.hotel ? this.state.hotel.stars : null}
                                            size={'large'} readOnly/>
                                </Grid>
                                <Box mt={2}>
                                    <Grid item xs={12}>
                                        <Typography variant={'h5'}>Comodidades</Typography>
                                        <AmenityList withNames={true} showDescription={true}
                                                     amenities={this.state.hotel ? this.state.hotel.amenities : []}/>
                                    </Grid>
                                </Box>
                                <Box mt={2}>
                                    <Typography variant={'h5'}>Contacto</Typography>
                                    <Grid item xs={12}>
                                        <Typography>{this.state.hotel.contactEmail}</Typography>
                                    </Grid>
                                </Box>
                                <Box mt={2}>
                                    <Grid item>
                                        <Typography variant={'h5'}>Habitaciones</Typography>
                                        <RoomList roomTypes={this.state.roomTypes} from={this.state.search.from}
                                                  until={this.state.search.until}
                                                  occupancy={this.state.search.occupancy}/>
                                    </Grid>
                                </Box>
                            </Box>
                        </Grid>

                    </Grid>

                </Grid>
                </span>
            )
        } else return null;
    }
}


HotelInfo.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HotelInfo);
