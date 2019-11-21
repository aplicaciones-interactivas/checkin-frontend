import React from 'react';
import Grid from "@material-ui/core/Grid";
import {Card, CardContent, withStyles} from "@material-ui/core";
import HotelImage from '../components/HotelImage';
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Price from '../components/Price';
import PropTypes from "prop-types";

const styles = theme => ({
    infoText: {}
});


class MisReservas extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const reservas = [{}, {}]
        return (
            <div>
                <Typography variant="h3">
                    Mis Reservas
                </Typography>
                <Grid container justify="center">
                    <Grid container lg={10}>
                        {
                            reservas.map(reserva =>
                                <Card>
                                    <CardContent>
                                        <Grid container direction="row">
                                            <Grid container lg={5} justify="center" alignItems="flex-end">
                                                <HotelImage isGrid={true} images={["", "", ""]}/>
                                            </Grid>
                                            <Grid container lg={5}>
                                                <Grid item><Typography variant="h4">Hotel - Ciudad -
                                                    País</Typography></Grid>
                                                <Grid item><Typography variant="h5">Fecha Desde - Fecha
                                                    Hasta</Typography></Grid>
                                                <Grid item>
                                                    <Typography variant="h6">Tipo de Habitación</Typography>
                                                    <Price price={'12345'}/>
                                                </Grid>
                                            </Grid>
                                            <Grid container lg={2} justify="center" alignItems="center">
                                                <Grid item>
                                                    <Button variant="contained" color="primary">
                                                        Cancelar
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            )
                        }
                    </Grid>
                </Grid>
            </div>
        )
    }
}

MisReservas.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MisReservas);
