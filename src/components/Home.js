import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import '../index.css';
import Typography from "@material-ui/core/Typography";
import {withStyles} from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import {DatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import GoogleMaps from './GoogleMaps';

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
        this.state = {from: null, until: null};
        this.dondeVasInputOnChange = this.dondeVasInputOnChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getCityInfo = this.getCityInfo.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.getFromDate = this.getFromDate.bind(this);
        this.getUntilDate = this.getUntilDate.bind(this);
        this.getPersons = this.getPersons.bind(this);
    }

    trim(string) {
        if (string) {
            return string.trim();
        }
    }

    handleChange(address) {
        this.setState({address});
    }

    handleClick(event) {
        console.log(this.state);
    }


    async dondeVasInputOnChange(event) {
        let destiny = event.target.value.split(',');
        await this.setState({destination: {city: this.trim(destiny[0]), country: this.trim(destiny[1])}});
        console.log(this.state);
    }

    getCityInfo(info) {
        this.setState({city_info: info});
    }

    getFromDate(date) {
        this.setState({from: date});
    }

    getUntilDate(date) {
        this.setState({until: date});
    }

    getPersons(event) {
        this.setState({persons: event.target.value});
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
                            <div className={classes.white_row}>
                                <Grid container direction={'row'}>
                                    <Grid item direction={'column'} xs={12} className={classes.formControlWrapper}>
                                        <GoogleMaps updateParentState={this.getCityInfo}/>
                                    </Grid>
                                </Grid>
                                <Grid container direction={'row'} spacing={1}>
                                    <Grid item direction={'column'} xs={12} md={4}
                                          className={classes.formControlWrapper}>
                                        <DatePicker
                                            onChange={this.getFromDate}
                                            className={classes.formControl}
                                            align={'left'} justify={'left'}
                                            disableToolbar
                                            inputVariant="outlined"
                                            format="dd/MM/yyyy"
                                            margin="normal"
                                            value={this.state.from}
                                            id="date-picker-inline"
                                            label="¿Cuando llegas?"
                                        />
                                    </Grid>
                                    <Grid item direction={'column'} xs={12} md={4}
                                          className={classes.formControlWrapper}>
                                        <DatePicker
                                            onChange={this.getUntilDate}
                                            className={classes.formControl}
                                            align={'left'} justify={'left'}
                                            disableToolbar
                                            inputVariant="outlined"
                                            format="dd/MM/yyyy"
                                            value={this.state.until}
                                            margin="normal"
                                            id="date-picker-inline"
                                            label="¿Cuando te vas?"
                                        />
                                    </Grid>
                                    <Grid item direction={'column'} xs={12} md={2}
                                          className={classes.formControlWrapper}>
                                        <FormControl className={classes.formControl} align={'left'} justify={'left'}
                                                     variant="outlined">
                                            <InputLabel htmlFor="component-outlined">
                                                Personas
                                            </InputLabel>
                                            <OutlinedInput
                                                onChange={this.getPersons}
                                                type={'number'}
                                                id="component-outlined"
                                                labelWidth={70}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item direction={'column'} xs={12} md={2}
                                          className={classes.formControlWrapper}>
                                        <Button variant="contained"
                                                className={`${classes.formControl} ${classes.formControlButton}`}
                                                color="primary" onClick={this.handleClick}>
                                            Buscar
                                        </Button>
                                    </Grid>
                                </Grid>
                            </div>
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
