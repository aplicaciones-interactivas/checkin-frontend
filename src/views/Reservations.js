import React from 'react';
import Grid from "@material-ui/core/Grid";
import {Box, Card, CardContent, withStyles} from "@material-ui/core";
import HotelImage from '../components/HotelImage';
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Price from '../components/Price';
import PropTypes from "prop-types";
import NavBar from "../components/NavBar";
import {CheckinReservationApi} from "../api/CheckinReservationApi";
import cookie from 'react-cookies';
import SpinnerWithMessage from "../components/SpinnerWithMessage";
import HotelNameLocation from "../components/HotelNameLocation";
import CheckInPlacesApi from "../api/CheckinPlacesApi";
import withConfirm from 'material-ui-confirm';
import Rating from "@material-ui/lab/Rating";
import {AmenityList} from "../components/AmenityList";
import {DatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const styles = theme => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(15, 2, 0, 3),
    },
    card: {
        margin: theme.spacing(0, 0, 2, 0)
    },
    infoContent: {
        margin: theme.spacing(0, 0, 0, 2)
    },
    containerBorderButton: {
        [theme.breakpoints.up('lg')]: {
            borderLeft: '1px dotted grey',
            paddingLeft: theme.spacing(1)
        }
    }
});

class Reservations extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.reservationApi = new CheckinReservationApi();
        this.placesApi = new CheckInPlacesApi();
        this.componentDidMount = this.componentDidMount.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    componentDidMount() {
        this.reservationApi.myReservations(cookie.load('token'))
            .then(data => {
                data = data.map(reservation => {
                        return this.placesApi.getCountryByCode(reservation.room.roomType.hotel.country).then(countryInfo => {
                            reservation.room.roomType.hotel.country = countryInfo.translations.es;
                            return reservation;
                        });
                    }
                )
                return Promise.all(data);
            }).then(data => this.setState({reservations: data}));
    }

    cancel(reservation, index) {
        this.reservationApi.cancel(reservation.id)
            .then(res => {
                const reservations = this.state.reservations;
                reservations.remove(reservations[index])
                this.setState({reservations: reservations});
            });
    }

    renderReservationList() {
        const {classes, confirm} = this.props;
        return (
            <Grid item xs={12}>
                {
                    this.state.reservations.map((reservation, i) =>
                        <Card className={classes.card}>
                            <CardContent>
                                <Grid container direction="row">
                                    <Grid item xs={12} lg={3}>
                                        <HotelImage images={reservation.room.roomType.hotel.__hotelImages__}/>
                                    </Grid>
                                    <Grid item xs={12} lg={7}>
                                        <Grid item xs={12} className={classes.infoContent}>
                                            <Grid item xs={12}>
                                                <HotelNameLocation hotel={reservation.room.roomType.hotel}
                                                                   country={reservation.room.roomType.hotel.country}/>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Rating value={reservation.room.roomType.hotel.stars}
                                                        size={'large'} readOnly/>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <AmenityList amenities={reservation.room.roomType.hotel.amenities}/>
                                            </Grid>
                                            <Grid container item xs={12} spacing={2}>
                                                <Grid item>
                                                    <DatePicker
                                                        disabled
                                                        align={'left'} justify={'left'}
                                                        inputVariant="outlined"
                                                        format="dd/MM/yyyy"
                                                        margin="normal"
                                                        value={reservation.from}
                                                        id="date-picker-inline"
                                                        label="¿Cuando llegas?"
                                                        variant={'inline'}
                                                    />
                                                </Grid>
                                                <Grid item>
                                                    <DatePicker
                                                        disabled
                                                        className={classes.datepicker}
                                                        align={'left'} justify={'left'}
                                                        inputVariant="outlined"
                                                        format="dd/MM/yyyy"
                                                        value={reservation.until}
                                                        margin="normal"
                                                        id="date-picker-inline"
                                                        label="¿Cuando te vas?"
                                                        variant={'inline'}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid container xs={12} lg={2} align="center" justify="center" alignItems={"center"}
                                          className={classes.containerBorderButton}>
                                        <Grid item xs={12}>
                                            Vas a pagar
                                            <Price price={reservation.totalPrice} notShowPerNigth={true}/>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button variant="contained" color="primary"
                                                    onClick={confirm(() => this.cancel(reservation, i), {
                                                        description: `Vas a cancelar tu reserva. Si lo haces, va a ser de manera permanente.`,
                                                        title: "¿Estás seguro?"
                                                    })}>
                                                Cancelar
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    )
                }
            </Grid>);
    }


    render() {
        const {classes} = this.props;
        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <NavBar/>
                <main className={classes.content}>
                    {
                        (() => {
                            if (this.state.reservations) {
                                return (
                                    <span>
                                <Typography variant="h3">
                                    Mis Reservas
                                </Typography>
                                <Grid container xs={12}>
                                    {
                                        this.renderReservationList()
                                    }
                                </Grid>
                           </span>
                                )
                            } else {
                                return (
                                    <SpinnerWithMessage
                                        message={'Espera un momento, estamos preparando tus reservas'}/>);
                            }
                        })()
                    }
                </main>
            </MuiPickersUtilsProvider>)


    }
}

Reservations.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withConfirm(Reservations));
