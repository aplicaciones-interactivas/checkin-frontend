import React from 'react';
import PropTypes from 'prop-types';
import '../index.css';
import Typography from "@material-ui/core/Typography";
import {withStyles} from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Buscador from "../components/Buscador";

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1
    },
    titulo: {
        margin: '150px 0px 0px 0px',
        color: '#3f51b5'
    },
    subtitulo: {
        color: '#3f51b5'
    },
    formControlWrapper: {
        margin: "10px 0px 0px 0px",
    },
    formControl: {
        margin: "0px 0px 0px 0px",
        width: '100%',
    },
    formControlButton: {
        height: '100%',
    },
    white_row: {
        background: 'white',
        borderRadius: '5px',
        padding: '10px 10px 15px 10px',
        margin: '10px 0px 0px 0px',
        maxWidth: '810px'
    }
});

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {classes} = this.props;
        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <div className={classes.root}>
                    <Grid container direction={'row'} className={'background-container container-fluid'}
                          align="center"
                          justify="center">
                        <Grid item direction={'column'}>
                            <Typography variant={'h1'} className={classes.titulo}>Check-In</Typography>
                            <Typography className={classes.subtitulo}>Hace check-in en los mejores hoteles del
                                mundo, al mejor precio</Typography>
                            <Buscador isHome={true}/>
                        </Grid>
                    </Grid>
                </div>
            </MuiPickersUtilsProvider>
        );
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
