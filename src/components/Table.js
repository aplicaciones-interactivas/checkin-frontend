import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button";
import Price from "./Price";
import {Link, Redirect} from "react-router-dom";


class RoomList extends React.Component {

    constructor(props) {
        super(props);
    }

    conditionalRender() {
        const {roomTypes, from, until, occupancy} = this.props;
        if (roomTypes && from && until && occupancy) {
            return (<Paper>
                <Table size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Tipo</TableCell>
                            <TableCell align="center">Habitantes</TableCell>
                            <TableCell align="center">Superficie</TableCell>
                            <TableCell align="center">Invitados</TableCell>
                            <TableCell align="center">Precio</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {roomTypes.map(room => (
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    {room.type}
                                </TableCell>
                                <TableCell align="center">{room.maxOcupancy}</TableCell>
                                <TableCell align="center">{room.surfaceArea}</TableCell>
                                <TableCell align="center">{room.guests}</TableCell>
                                <TableCell align="center">
                                    Reservar por: <Price price={room.price}></Price>
                                    <Link to={{
                                        pathname: '/Reservation',
                                        state: {
                                            roomType: room,
                                            from: from,
                                            until: until,
                                            occupancy: occupancy,
                                            hotelId: room.hotelId
                                        }
                                    }}>
                                        <Button variant="contained" color="primary">
                                            Reservar
                                        </Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>);
        } else {
            return <Redirect to={'/'}/>
        }
    }


    render() {
        return (
            <div>
                {
                    this.conditionalRender()
                }
            </div>
        );
    }
}

export default (RoomList);
