import React from 'react';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import {Card, CardContent, withStyles} from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const styles = theme => ({
    card: {
        marginTop: '50px',
        marginLeft: '100px',
        marginRight: '100px'
    },
    FormLabel: {
        marginTop: '20px',
        marginBottom: '5px'
    },
    googleMap: {
        width: '200px',
        marginTop: '10px'
    },
    buttonImage: {
        margin: theme.spacing(1),
    },
    emailBox: {
        marginLeft: '5px'
    },
    Title: {
        marginBottom: '20px'
    }
});


class HotelABM extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {classes} = this.props;
        return(
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h3" className={classes.Title}>Datos del Hotel</Typography>
                    <form>
                      <Grid container direction="row" justify="flex-start" lg={12}>
                       <Grid container direction="column" justify="center" lg={8}>
                           <Grid container direction="row" justify="flex-start">
                               <Grid item><TextField id="outlined-basic" label="Nombre" variant="outlined"/></Grid>
                               <Grid item><TextField id="outlined-basic" label="Email" variant="outlined" className={classes.emailBox} type={'email'} validators={['required', 'isEmail']}/></Grid>
                               <Grid item><TextField id="outlined-basic" label="Teléfono" variant="outlined" className={classes.emailBox}/></Grid>
                           </Grid>
                           <Grid item><FormLabel component="legend" className={classes.FormLabel}>Ubicación</FormLabel></Grid>
                            <Grid container direction="row">
                                <Grid item><TextField id="outlined-basic" label="País" variant="outlined" className={classes.emailBox}/></Grid>
                                <Grid item><TextField id="outlined-basic" label="Cuidad" variant="outlined" className={classes.emailBox}/></Grid>
                                <Grid item><TextField id="outlined-basic" label="Dirección" variant="outlined" className={classes.emailBox}/></Grid>
                            </Grid>
                            <Grid container direction="column">
                                <FormLabel component="legend" className={classes.FormLabel}>Cantidad de Estrellas</FormLabel>
                                <Rating value={3} size={'medium'}/>
                            </Grid>
                            <Grid container direction="row">
                            <FormLabel component="legend" className={classes.FormLabel}>Imágenes del Hotel</FormLabel>
                                <Button
                                    variant="contained"
                                    color="default"
                                    className={classes.buttonImage }
                                    startIcon={<CloudUploadIcon />}
                                >
                                    Subir Imagen
                                </Button>
                            </Grid>
                            <Grid container>
                                <Table>
                                    <TableRow>
                                <TableCell><FormControlLabel control={<Checkbox value="checkedB" color="primary"/>} label="Bata de Baño"/></TableCell>
                                <TableCell><FormControlLabel control={<Checkbox value="checkedB" color="primary"/>} label="Bañera"/></TableCell>
                                <TableCell><FormControlLabel control={<Checkbox value="checkedB" color="primary"/>} label="Elementos de Playa"/></TableCell>
                                <TableCell><FormControlLabel control={<Checkbox value="checkedB" color="primary"/>} label="Oficina"/></TableCell>
                                    </TableRow>
                                    <TableRow>
                                    <TableCell><FormControlLabel control={<Checkbox value="checkedB" color="primary"/>} label="Gimnasio"/></TableCell>
                                    <TableCell><FormControlLabel control={<Checkbox value="checkedB" color="primary"/>} label="Cafetera"/></TableCell>
                                    <TableCell><FormControlLabel control={<Checkbox value="checkedB" color="primary"/>} label="Jacuzzi"/></TableCell>
                                    <TableCell><FormControlLabel control={<Checkbox value="checkedB" color="primary"/>} label="Actividades para niños"/></TableCell>
                                    </TableRow>
                                    <TableRow>
                                    <TableCell><FormControlLabel control={<Checkbox value="checkedB" color="primary"/>} label="Jardín"/></TableCell>
                                    <TableCell><FormControlLabel control={<Checkbox value="checkedB" color="primary"/>} label="Cocina"/></TableCell>
                                    <TableCell><FormControlLabel control={<Checkbox value="checkedB" color="primary"/>} label="Diario"/></TableCell>
                                    <TableCell><FormControlLabel control={<Checkbox value="checkedB" color="primary"/>} label="Boliche"/></TableCell>
                                    </TableRow>
                                    <TableRow>
                                    <TableCell><FormControlLabel control={<Checkbox value="checkedB" color="primary"/>} label="Restaurante"/></TableCell>
                                    <TableCell><FormControlLabel control={<Checkbox value="checkedB" color="primary"/>} label="Caja Fuerte"/></TableCell>
                                    <TableCell><FormControlLabel control={<Checkbox value="checkedB" color="primary"/>} label="Sábanas"/></TableCell>
                                    <TableCell><FormControlLabel control={<Checkbox value="checkedB" color="primary"/>} label="Oficina"/></TableCell>
                                    </TableRow>
                                </Table>
                            </Grid>
                            <Grid container>
                            <Grid item sm={8} lg={10}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    Registrar Hotel
                                </Button>
                            </Grid>
                            </Grid>
                         </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>
        ) 
    }
}


HotelABM.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HotelABM);