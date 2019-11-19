import React from 'react';
import HotelImage from '../components/HotelImage';
import Grid from "@material-ui/core/Grid";
import {CheckinHotelApi} from "../api/CheckinHotelApi";
import {parse} from 'query-string';
import {withStyles} from '@material-ui/styles';
import {AmenityList} from "../components/AmenityList";
import Rating from "@material-ui/lab/Rating";
import PropTypes from "prop-types";
import Table from '../components/Table';
import {Card} from "@material-ui/core";
import HotelNameLocation from "../components/HotelNameLocation";
import CheckinPlacesApi from "../api/CheckinPlacesApi";
import Box from "@material-ui/core/Box";


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
        const search = parse(window.location.search);
        this.state = {search: search}
        this.componentDidMount = this.componentDidMount.bind(this)
    }

    componentDidMount() {
        const {hotelId} = this.props.match.params;
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
    }

    render() {
        if (this.state.hotel && this.state.country) {


            const images = [
                {
                    original: 'https://picsum.photos/id/1018/1000/600/',
                    thumbnail: 'https://picsum.photos/id/1018/250/150/',
                },
                {
                    original: 'https://picsum.photos/id/1015/1000/600/',
                    thumbnail: 'https://picsum.photos/id/1015/250/150/',
                },
                {
                    original: 'https://picsum.photos/id/1019/1000/600/',
                    thumbnail: 'https://picsum.photos/id/1019/250/150/',
                },
            ];

            const amens = [
                {
                    beach: 'beach'
                }
            ];

            const {classes} = this.props;
            return (
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
                                    <Grid item xs={12}>
                                        <AmenityList withNames={true}
                                            amenities={this.state.hotel ? this.state.hotel.amenities : []}/>
                                    </Grid>
                                    <Grid item>
                                        <p>Habitaciones</p>
                                        <Table/>
                                    </Grid>
                                </Box>
                            </Grid>

                    </Grid>

                </Grid>
            )
        } else return null;
    }
}


HotelInfo.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HotelInfo);
