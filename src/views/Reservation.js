import React from "react";
import {parse} from "query-string";
import {CheckinHotelApi} from "../api/CheckinHotelApi";
import CheckInRoomTypeApi from "../api/CheckInRoomTypeApi";
import Grid from "@material-ui/core/Grid";
import {Box, Card, CardContent, CardHeader, Typography, withStyles} from "@material-ui/core";
import HotelImage from "../components/HotelImage";
import CheckInPlacesApi from "../api/CheckinPlacesApi";
import {Rating} from "@material-ui/lab";
import {DatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import PropTypes from "prop-types";
import {AmenityList} from "../components/AmenityList";
import SpinnerWithMessage from "../components/SpinnerWithMessage";
import Price from "../components/Price";
import {CheckinReservationApi} from "../api/CheckinReservationApi";
import {MealPlanTable} from "../components/MealPlanTable";
import Button from "@material-ui/core/Button";
import cookie from 'react-cookies';
import Redirect from "react-router-dom/es/Redirect";
import tr from "moment/locale/tr";
import SnackbarContentWrapper from "../components/SnackbarContentWrapper";
import HotelNameLocation from "../components/HotelNameLocation";
import NavBar from "../components/NavBar";

const styles = theme => ({

    datepicker: {
        marginLeft: '1%'
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(8, 0, 0, 0),
    },

});

class Reservation extends React.Component {

    constructor(props) {
        super(props);
        let search = this.props.location.state.search ? this.props.location.state.search : this.props.location.state;
        if (search.hotel) {
            search.hotelId = search.hotel.id;
        }

        this.state = {
            search: search,
            toLogin: false,
            action: 'Reservation'
        };
        this.hotelApi = new CheckinHotelApi();
        this.roomTypeApi = new CheckInRoomTypeApi();
        this.placesApi = new CheckInPlacesApi();
        this.reservationApi = new CheckinReservationApi();
        this.onReservation = this.onReservation.bind(this);
        this.resolveReservationResponse = this.resolveReservationResponse.bind(this);
        this.reserve = this.reserve.bind(this);
    }

    onReservation(method) {
        if (cookie.load('token') === undefined) {
            this.setState({toLogin: true});
        } else {
            method();
        }
    }

    reserve() {
        this.reservationApi.reserve(cookie.load('token'), this.state.search.from, this.state.search.until, this.state.search.roomType.id)
            .then(res => {
                this.resolveReservationResponse(res);
            });
    }

    resolveReservationResponse(res) {
        if (res.statusCode) {
            this.setState({reservationStatus: false});
        } else {
            this.setState({reservationStatus: true});
        }
    }

    componentDidMount() {
        this.hotelApi.getById(this.state.search.hotelId)
            .then(data => {
                this.setState({hotel: data});
                return data;
            }).then(data => {
            this.placesApi.getCountryByCode(data.country)
                .then(countryInfo => {
                    console.log(countryInfo)
                    this.setState({country: countryInfo.translations.es});
                })
        });
        this.hotelApi.getMealPlansById(this.state.search.hotelId)
            .then(data => this.setState({mealPlans: data}));
        this.roomTypeApi.findByIdAndHotelId(this.state.search.roomType.id, this.state.search.hotelId)
            .then(data => this.setState({roomType: data}));
        this.reservationApi.calculateTotal(this.state.search.roomType.id, this.state.search.from, this.state.search.until)
            .then(data => this.setState({totalPrice: data.price}));
    }

    conditionalRender() {
        const {classes} = this.props;
        if (this.state.reservationStatus !== undefined) {
            if (this.state.reservationStatus) {
                return (<SnackbarContentWrapper message={"Tu reserva se realizo con exito"}
                                                variant={'success'}></SnackbarContentWrapper>);
            } else {
                return (<SnackbarContentWrapper
                    message={"No se pudo realizar tu reserva. Volve a intentarlo en unos minutos."}
                    variant={'warning'}></SnackbarContentWrapper>);
            }
        } else {
            if (this.state.toLogin) {
                return (<Redirect
                    to={{
                        pathname: `/SignIn`,
                        state: this.state
                    }}/>)
            } else if (this.state.hotel && this.state.mealPlans && this.state.roomType && this.state.totalPrice && this.state.country) {
                return (<Grid container direction={'row'}>
                    <Grid item xs={12} md={5}>
                        <Box pl={2}>
                            <HotelImage isGrid={true}
                                        images={this.state.hotel ? this.state.hotel.__hotelImages__ : []}/>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={7}>
                        <Box pl={2}>
                            <Grid item xs={12}>
                                <HotelNameLocation hotel={this.state.hotel} country={this.state.country}/>
                            </Grid>
                            <Grid item xs={12}>
                                <Rating value={this.state.hotel ? this.state.hotel.stars : null}
                                        size={'large'} readOnly/>
                            </Grid>
                            <Grid item xs={12}>
                                <AmenityList
                                    amenities={this.state.hotel ? this.state.hotel.amenities : []}/>
                            </Grid>
                            <Grid item xs={12}>
                                <DatePicker
                                    disabled
                                    onChange={this.getFromDate}
                                    align={'left'} justify={'left'}
                                    inputVariant="outlined"
                                    format="dd/MM/yyyy"
                                    margin="normal"
                                    value={this.state.search.from}
                                    id="date-picker-inline"
                                    label="¿Cuando llegas?"
                                    variant={'inline'}
                                />
                                <DatePicker
                                    disabled
                                    className={classes.datepicker}
                                    onChange={this.getUntilDate}
                                    align={'left'} justify={'left'}
                                    inputVariant="outlined"
                                    format="dd/MM/yyyy"
                                    value={this.state.search.until}
                                    margin="normal"
                                    id="date-picker-inline"
                                    label="¿Cuando te vas?"
                                    variant={'inline'}
                                />
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box pl={2}>
                            <Typography variant={'h7'}>
                                Precio por noche
                            </Typography>
                            <Price price={this.state.roomType.price} notShowPerNigth={true}></Price>
                            <Typography variant={'h7'}>
                                Precio total
                            </Typography>
                            <Price price={this.state.totalPrice} notShowPerNigth={true}></Price>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant={'h6'}>
                            <Box pl={2} pt={2}>
                                Podes agregar
                            </Box>
                        </Typography>
                        <MealPlanTable mealPlans={this.state.mealPlans} from={this.state.search.from}
                                       until={this.state.search.until}
                                       roomTypeId={this.state.search.roomType.id}
                                       onReservationFinish={this.resolveReservationResponse}
                                       validateBeforeReserve={this.onReservation}></MealPlanTable>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant={'h6'}>
                            <Box pl={2} pt={2}>
                                O sino directamente reservarlo asi como lo elegiste
                            </Box>
                        </Typography>
                        <Box pl={2}>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={() => this.onReservation(this.reserve)}
                            >
                                Reservar
                            </Button>
                        </Box>
                    </Grid>
                </Grid>);
            } else {
                return (<SpinnerWithMessage message={'Espera un momento, estamos preparando tu reserva'}/>);
            }
        }
    }

    render() {

        const {classes} = this.props;
        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <NavBar/>
                <main className={classes.content}>
                    <Grid align={'center'} justify={'center'} container direction={'row'}>
                        <Grid item direction={'column'} xs={11} align={'left'} justify={'left'}>
                            <br/>
                            <Card>
                                <CardContent>
                                    {
                                        this.conditionalRender()
                                    }
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </main>
            </MuiPickersUtilsProvider>
        )
    }
}

Reservation.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Reservation);
