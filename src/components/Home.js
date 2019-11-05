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
        this.handleChange = this.handleChange.bind(this);
        this.getCityInfo = this.getCityInfo.bind(this);
        this.getFromDate = this.getFromDate.bind(this);
        this.getUntilDate = this.getUntilDate.bind(this);
        this.getPersons = this.getPersons.bind(this);
        this.getQueryUrl = this.getQueryUrl.bind(this);
    }

    handleChange(address) {
        this.setState({address});
    }

    getCityInfo(info) {
        this.setState({city_info: info});
    }

    getFromDate(date) {
        this.setState({from: date.toISOString()});
    }

    getUntilDate(date) {
        this.setState({until: date.toISOString()});
    }

    getPersons(event) {
        this.setState({persons: event.target.value});
    }

    getQueryUrl() {
        let country = ''
        let city = '';
        let from = '';
        let until = '';
        if (this.state.city_info) {
            country = this.state.city_info.address_components.filter(component => component.types.includes('country'))[0].short_name;
            city = this.state.city_info.address_components.filter(component => component.types.includes('locality'))[0].long_name;
        }
        let persons = this.state.persons;
        if (this.state.from)
            from = this.state.from.slice(0, 10);
        if (this.state.until)
            until = this.state.until.slice(0, 10);

        return 'country=' + country + '&city=' + city + '&from=' + from + '&until=' + until + '&occupancy=' + persons;
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
                                            inputVariant="outlined"
                                            format="dd/MM/yyyy"
                                            margin="normal"
                                            value={this.state.from}
                                            id="date-picker-inline"
                                            label="¿Cuando llegas?"
                                            variant={'inline'}
                                        />
                                    </Grid>
                                    <Grid item direction={'column'} xs={12} md={4}
                                          className={classes.formControlWrapper}>
                                        <DatePicker
                                            onChange={this.getUntilDate}
                                            className={classes.formControl}
                                            align={'left'} justify={'left'}
                                            inputVariant="outlined"
                                            format="dd/MM/yyyy"
                                            value={this.state.until}
                                            margin="normal"
                                            id="date-picker-inline"
                                            label="¿Cuando te vas?"
                                            variant={'inline'}
                                        />
                                    </Grid>
                                    <Grid item direction={'column'} xs={12} md={2}
                                          className={classes.formControlWrapper}>
                                        <FormControl className={classes.formControl} align={'left'} justify={'left'}
                                                     variant="outlined">
                                            <InputLabel htmlFor="component-outlined">
                                                Personas *
                                            </InputLabel>
                                            <OutlinedInput
                                                onChange={this.getPersons}
                                                type={'number'}
                                                id="component-outlined"
                                                labelWidth={80}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item direction={'column'} xs={12} md={2}
                                          className={classes.formControlWrapper}>
                                        <Button variant="contained"
                                                href={`/infoHotel?${this.getQueryUrl()}`}
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
