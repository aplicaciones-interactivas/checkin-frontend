import React from 'react';
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import withConfirm from 'material-ui-confirm';
import {withRouter} from "react-router-dom";
import MaterialTable from 'material-table';
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete/Autocomplete";
import {CheckinHotelApi} from "../../../api/CheckinHotelApi";
import {CheckinReservationApi} from "../../../api/CheckinReservationApi";
import cookies from 'react-cookies';

const styles = (theme) => ({});

class ReservationsList extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {hotels: [], reservations: []};
        this.hotelApi = new CheckinHotelApi();
        this.reservationApi = new CheckinReservationApi();
    }

    componentDidMount() {
        this.hotelApi.getByUser(cookies.load('token'))
            .then(data => {
                this.setState({hotels: data});
            })
    }

    render() {
        return (
            <span>
            <Autocomplete
                inputId="react-select-hotel"
                options={this.state.hotels}
                getOptionLabel={option => option.name}
                renderInput={params => (
                    <TextField {...params} label='Hotel *' variant="outlined" fullWidth/>
                )}
                onChange={(evnt => {
                    this.reservationApi.findByHotelId(this.state.hotels[evnt.target.dataset.optionIndex].id, cookies.load('token'))
                        .then(data => {
                            return data.map(reservation => {
                                reservation.user.fullname = reservation.user.name + ' ' + reservation.user.lastname;
                                return reservation;
                            });
                        }).then(data => this.setState({reservations: data}));
                })}
                required
            />
                    <MaterialTable
                        title=""
                        columns={[
                            {title: 'Codigo de reserva', field: 'id'},
                            {title: 'Nombre', field: 'user.fullname'},
                            {title: 'Habitacion', field: 'room.roomType.type'},
                            {title: 'Plan de comidas', field: 'hotelMealPlan.mealPlan.name'},
                            {title: 'Precio', field: 'totalPrice'},
                        ]}
                        localization={{
                            body: {
                                emptyDataSourceMessage: 'No tenes aun reservas'
                            },
                            pagination: {
                                labelRowsSelect: 'Filas',
                                labelRowsPerPage: 'Filas por pagina'
                            },
                            toolbar: {
                                searchTooltip: 'Buscar',
                                searchPlaceholder: 'Buscar'
                            },
                        }}
                        data={this.state.reservations}
                    />
                    </span>
        );
    }
}

ReservationsList.propTypes = {
    classes: PropTypes.object.isRequired,
    confirm: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(withConfirm(ReservationsList)));
