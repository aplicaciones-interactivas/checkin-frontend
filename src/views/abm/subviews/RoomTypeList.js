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
import CheckInRoomTypeApi from "../../../api/CheckInRoomTypeApi";


const styles = (theme) => ({
    deleteButton: {
        backgroundColor: 'red'
    }
});

class RoomTypeList extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {groupedRoomTypes: []};
        this.hotelApi = new CheckinHotelApi();
        this.roomTypeApi = new CheckInRoomTypeApi();
        this.placesApi = new CheckinPlacesApi();
        this.getHotels = this.getHotels.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }


    componentDidMount() {
        this.getHotels();
    }

    getHotels() {
        if (cookie.load('token')) {

            this.roomTypeApi.findByUser(cookie.load('token'))
                .then(roomTypes => {
                    let groupedRoomTypes = roomTypes.reduce((sum, a) => {
                        if (!sum[a.hotel.id]) {
                            sum[a.hotel.id] = []
                        }
                        sum[a.hotel.id].push(a);
                        return sum;
                    }, {});
                    console.log(groupedRoomTypes);
                    groupedRoomTypes = Object.keys(groupedRoomTypes).reduce((sum, a) => {
                        sum.push(groupedRoomTypes[a]);
                        return sum;
                    }, []);

                    console.log(groupedRoomTypes);

                    this.setState({groupedRoomTypes: groupedRoomTypes});
                });
        }
    }


    onDelete() {
        if (this.state.deleteError) {
            return <ErrorBox message={'Ocurrio un error al borrar el hotel. Contacte con soporte'}/>
        }
        return null;
    }

    deleteItem(hotel) {
        this.hotelApi.delete(hotel.id, cookie.load('token'))
            .then(res => {
                if (res.status == 500) {
                    this.setState({deleteError: true})
                } else {
                    this.setState({deleteError: false})
                }
            });
    }

    render() {
        const {classes, confirm} = this.props;

        return (<span>
            {
                this.onDelete()
            }
            <Grid xs={12}>
                <Button fullWidth variant="contained" color="primary">Agregar</Button>
            </Grid>
             <Table size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Nombre</TableCell>
                            <TableCell align="center">Personas</TableCell>
                            <TableCell align="center">Area</TableCell>
                            <TableCell align="center">Visitantes</TableCell>
                            <TableCell align="center">Habitacion</TableCell>
                            <TableCell align="center">Hotel</TableCell>
                            <TableCell align="center">Precios</TableCell>
                            <TableCell align="center">Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            this.state.groupedRoomTypes.map(roomTypes => {
                                return roomTypes.map(roomType => {
                                    return <TableRow>
                                        <TableCell align="center">{roomType.type}</TableCell>
                                        <TableCell align="center">{roomType.maxOcupancy}</TableCell>
                                        <TableCell align="center">{roomType.surfaceArea}</TableCell>
                                        <TableCell align="center">{roomType.guests}</TableCell>
                                        <TableCell align="center">{roomType.rooms.length}</TableCell>
                                        <TableCell align="center">{roomType.hotel.name}</TableCell>
                                        <TableCell align="center">{roomType.price}</TableCell>
                                        <TableCell align="center">
                                            <Fab size="small" aria-label="Add" color={'secondary'}
                                                 onClick={confirm(() => this.deleteItem(roomType), {
                                                     description: `Se borrara permanentemente ${roomType.name}.`,
                                                     title: "¿Estás seguro?"
                                                 })}>
                                                <DeleteIcon/>
                                            </Fab>
                                            <Fab size="small" aria-label="Add" color={'primary'}>
                                                <EditIcon/>
                                            </Fab>
                                        </TableCell>
                                    </TableRow>
                                })
                            })



                        }
                    </TableBody>
                </Table>
        </span>);
    }
}


RoomTypeList.propTypes = {
    classes: PropTypes.object.isRequired,
    confirm: PropTypes.object.isRequired,
};

export default withStyles(styles)(withConfirm(RoomTypeList));
