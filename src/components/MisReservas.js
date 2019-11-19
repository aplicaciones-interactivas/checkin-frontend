import React from 'react';
import Grid from "@material-ui/core/Grid";
import {Card, CardContent} from "@material-ui/core";
import HotelImage from './HotelImage';
import Button from "@material-ui/core/Button";

class MisReservas extends React.Component{
    render() {
        return (
            <Grid container justify="center">
                <Grid item lg={10}>
                    <Card>
                       <CardContent>
                            <Grid container direction="row" spacing={3}>
                                 <Grid item lg={4} container justify="center" alignItems="flex-end">
                                     <HotelImage isGrid={true} images={["","",""]} />
                                 </Grid>
                                 <Grid item lg={4} container>
                                     <h1>Nombre Hotel - Ciudad - País</h1>
                                     <h2>Fecha Desde - Fecha Hasta</h2>
                                     <h3>Tipo de Habitación - Precio</h3>
                                 </Grid>
                                 <Grid item lg={4}>
                                     <Button variant="contained" color="primary">
                                        Cancelar
                                     </Button>
                                 </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        )
    }
}



export default (MisReservas);