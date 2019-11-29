import React from 'react';
import {CheckinHotelApi} from "../../../api/CheckinHotelApi";
import cookie from 'react-cookies';
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Price from "../../../components/Price";
import {Link, withRouter} from "react-router-dom";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import NavBar from "../../../components/NavBar";
import Fab from "@material-ui/core/Fab";
import DeleteIcon from '@material-ui/icons/Delete';
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import CheckinPlacesApi from "../../../api/CheckinPlacesApi";
import Grid from "@material-ui/core/Grid";
import withConfirm from 'material-ui-confirm';
import ErrorBox from "../../../components/ErrorBox";


const styles = (theme) => ({
    deleteButton: {
        backgroundColor: 'red'
    }
});

class HotelList extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {hotels: []};
        this.hotelApi = new CheckinHotelApi();
        this.placesApi = new CheckinPlacesApi();
        this.getHotels = this.getHotels.bind(this);
    }


    componentDidMount() {
        this.getHotels();
    }

    getHotels() {
        if (cookie.load('token')) {
            return this.hotelApi.getByUser(cookie.load('token'))
                .then(data => {
                    const countries = {};
                    data.forEach(hotel => {
                        if (!countries[hotel.country])
                            countries[hotel.country] = this.placesApi.getCountryByCode(hotel.country);
                    });
                    return Promise.all(Object.values(countries)).then(countriesRes => {
                        Object.keys(countries).forEach((e, i) => {
                            countries[e] = countriesRes[i].translations.es;
                        })
                        return countries
                    }).then(countries => {
                        data = data.map(hotel => {
                            hotel.country = countries[hotel.country];
                            return hotel;
                        });
                        return data;
                    });
                })
                .then(data => this.setState({hotels: data}));
        }
    }

    render() {
        const {classes, confirm} = this.props;

        return (<span>
            <Grid xs={12}>
                <Button fullWidth variant="contained" color="primary" onClick={() => {
                    this.props.history.push('/Administration', {
                        view: "hotelForm"
                    })
                }}>Agregar</Button>
            </Grid>
             <Table size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Nombre</TableCell>
                            <TableCell align="center">Email de contacto</TableCell>
                            <TableCell align="center">Telefono</TableCell>
                            <TableCell align="center">CheckIn-CheckOut</TableCell>
                            <TableCell align="center">Estrellas</TableCell>
                            <TableCell align="center">Categoria</TableCell>
                            <TableCell align="center">Ciudad</TableCell>
                            <TableCell align="center">Pais</TableCell>
                            <TableCell align="center">Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            this.state.hotels.map(hotel => <TableRow>
                                <TableCell align="center">{hotel.name}</TableCell>
                                <TableCell align="center">{hotel.contactEmail}</TableCell>
                                <TableCell align="center">{hotel.primaryContactPhone}</TableCell>
                                <TableCell align="center">{hotel.checkinTime}-{hotel.checkoutTime}</TableCell>
                                <TableCell align="center">{hotel.stars}</TableCell>
                                <TableCell align="center">{hotel.category}</TableCell>
                                <TableCell align="center">{hotel.city}</TableCell>
                                <TableCell align="center">{hotel.country}</TableCell>
                                <TableCell align="center">
                                    <Fab size="small" aria-label="Add" color={'primary'} onClick={() => {
                                        this.props.history.push('/Administration', {
                                            view: 'hotelForm',
                                            hotelId: hotel.id,
                                            mode: 'update'
                                        })
                                    }}>
                                        <EditIcon/>
                                    </Fab>
                                </TableCell>
                            </TableRow>)

                        }
                    </TableBody>
                </Table>
        </span>);
    }
}


HotelList.propTypes = {
    classes: PropTypes.object.isRequired,
    confirm: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(HotelList));
