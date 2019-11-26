import React from 'react';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import {Card, CardContent, withStyles} from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import GoogleMapsfrom from "./GoogleMaps";
import Rating from "@material-ui/lab/Rating";

const styles = theme => ({
    card: {
        margin: '50px'
    },
    FormLabel: {
        marginTop: '20px'
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
                    <form>
                      <Grid container direction="row" justify="center">
                       <Grid container direction="column" justify="center" lg={10}>
                           <Grid container direction="row" justify="flex-start">
                               <Grid item><TextField id="outlined-basic" label="Nombre" variant="outlined"/></Grid>
                               <Grid item><TextField id="outlined-basic" label="Email" variant="outlined" className={classes.emailBox}/></Grid>
                               <Grid item><TextField id="outlined-basic" label="Teléfono" variant="outlined" className={classes.emailBox} type={'email'} validators={['required', 'isEmail']}/></Grid>
                           </Grid>
                            <Grid container direction="column">
                                <FormLabel component="legend" className={classes.FormLabel}>Ubicación</FormLabel>
                                <GoogleMapsfrom className={classes.googleMap}/>
                            </Grid>
                            <Grid container direction="column">
                                <FormLabel component="legend" className={classes.FormLabel}>Cantidad de Estrellas</FormLabel>
                                <Rating value={3} size={'medium'}/>
                            </Grid>
                            <Grid container>
                                <Button
                                    variant="contained"
                                    color="default"
                                    className={classes.buttonImage }
                                    startIcon={<CloudUploadIcon />}
                                >
                                    Subir Imagen
                                </Button>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Registrarse
                            </Button>
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