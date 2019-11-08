import React from 'react';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import GoogleMaps from "./GoogleMaps";
import {DatePicker} from "@material-ui/pickers";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";

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
    },
    light_blue_row: {
        background: '#e2f0ff',
        borderRadius: '5px',
        padding: '10px 10px 15px 10px',
        margin: '10px 0px 0px 0px',
        maxWidth: '810px',
    },
    input_background: {
        backgroundColor: 'white'
    }
});

class Buscador extends React.Component {

    constructor(props) {
        super(props);
        this.state = {until: null, from: null}
        if (props.initialData) {
            this.state = {
                until: props.initialData.until,
                from: props.initialData.until,
                persons: props.initialData.occupancy,
            };
        }
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
        let query = 'country=' + country + '&city=' + city + '&from=' + from + '&until=' + until + '&occupancy=' + persons;

        if (this.state.city_info && this.state.city_info.place_id) {
            query += '&placeId=' + this.state.city_info.place_id;
        }
        return query;
    }

    render() {
        const {classes, isHome} = this.props;
        return (
            <div className={isHome ? classes.white_row : classes.light_blue_row}>
                <Grid container direction={'row'}>
                    <Grid item direction={'column'} xs={12} className={classes.formControlWrapper}>
                        <GoogleMaps updateParentState={this.getCityInfo} isHome={isHome}/>
                    </Grid>
                </Grid>
                <Grid container direction={'row'} spacing={1}>
                    <Grid item direction={'column'} xs={12} md={isHome ? 4 : 12}
                          className={classes.formControlWrapper}>
                        <DatePicker
                            onChange={this.getFromDate}
                            className={`${classes.formControl} ${classes.input_background}`}
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
                    <Grid item direction={'column'} xs={12} md={isHome ? 4 : 12}
                          className={classes.formControlWrapper}>
                        <DatePicker
                            onChange={this.getUntilDate}
                            className={`${classes.formControl} ${classes.input_background}`}
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
                    <Grid item direction={'column'} xs={12} md={isHome ? 2 : 12}
                          className={classes.formControlWrapper}>
                        <FormControl className={classes.formControl} align={'left'} justify={'left'}
                                     variant="outlined">
                            <InputLabel htmlFor="component-outlined">
                                Personas *
                            </InputLabel>
                            <OutlinedInput
                                className={classes.input_background}
                                onChange={this.getPersons}
                                value={this.state.persons}
                                type={'number'}
                                id="component-outlined"
                                labelWidth={80}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item direction={'column'} xs={12} md={isHome ? 2 : 12}
                          className={classes.formControlWrapper}>
                        <Button variant="contained"
                                href={`/Hotels?${this.getQueryUrl()}`}
                                className={`${classes.formControl} ${classes.formControlButton}`}
                                color="primary" onClick={this.handleClick}>
                            Buscar
                        </Button>
                    </Grid>
                </Grid>
            </div>)
    }

}

Buscador.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Buscador);
