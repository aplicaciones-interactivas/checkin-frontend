import React from 'react';
import Grid from "@material-ui/core/Grid";
import {Card, CardContent} from "@material-ui/core";
import HotelImage from './HotelImage';
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

class MisReservas extends React.Component{
    render() {
        return (
            <div>
                <Typography variant="h2">
                    Mis Reservas
                </Typography>
                <Grid container justify="center">
                    <Grid container lg={10}>
                    <Card>
                        <CardContent>
                                <Grid container direction="row" spacing={3}>
                                    <Grid container lg={4} justify="center" alignItems="flex-end">
                                        <HotelImage isGrid={true} images={["","",""]} />
                                    </Grid>
                                    <Grid container lg={4}>
                                        <Typography variant="h4">Nombre Hotel - Ciudad - País</Typography>
                                        <h2>Fecha Desde - Fecha Hasta</h2>
                                        <h3>Tipo de Habitación - Precio</h3>
                                    </Grid>
                                    <Grid container lg={4} justify="center" alignItems="center">
                                        <Grid item>
                                            <Button variant="contained" color="primary">
                                            Cancelar
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        )
    }
}



export default (MisReservas);