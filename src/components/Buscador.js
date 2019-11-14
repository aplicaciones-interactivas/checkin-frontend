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
import {parse} from 'query-string';
import * as moment from 'moment';
import Rating from "@material-ui/lab/Rating";
import Checkbox from "@material-ui/core/Checkbox";
import Box from "@material-ui/core/Box";
import CheckinAmenitiesApi from "../api/CheckinAmenitiesApi";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
    lightBlueBody: {
        background: '#e2f0ff',
        borderRadius: '5px',
        padding: '10px 10px 15px 10px',
        margin: '10px 0px 0px 0px',
    },
    noLeftPadding: {
        paddingLeft: '10px',
    },
    lightBlueRow: {
        background: '#e2f0ff',
        boxShadow: 'none'
    },

    input_background: {
        backgroundColor: 'white'
    },
    rating: {
        display: 'flex',
        alignItems: 'center',
    },
    sectionTile: {
        marginTop: theme.spacing(1)
    },
    panelDetails:{
        padding: 0,
        "& div": {
            margin: 0
        }
    },
    panelTitle:{
        margin: 0
    }
});

class Buscador extends React.Component {

    constructor(props) {
        super(props);
        this.state = {amenities: [], selectedStars: [], selectedAmenities: []};
        this.state.expansionPanels = {
            starsPanel: window.innerWidth >= 1280,
            amenityPanel:  window.innerWidth >= 1280,
        }
        this.checkinAmenitiesApi = new CheckinAmenitiesApi();
        this.checkinAmenitiesApi.get()
            .then(data => {
                this.setState({amenities: data})
            });
        if (!props.isHome) {
            const search = parse(window.location.search);
            this.state.from = moment(search.from);
            this.state.until = moment(search.until);
            this.state.occupancy = search.occupancy;
            let selectedStars = [];
            if (search.stars) {
                selectedStars = search.stars.split("stars=");
            }
            this.state.selectedStars = selectedStars;
            const statusStars = {};
            selectedStars.forEach(v => {
                statusStars[v] = true;
            });
            this.state.statusStars = statusStars;

            let selectedAmenities = [];
            if (search.amenities) {
                selectedAmenities = search.amenities.split("amenities=");
            }
            this.state.selectedAmenities = selectedAmenities;
            const statusAmenities = {};
            selectedAmenities.forEach(v => {
                statusAmenities[v] = true;
            });
            this.state.statusStars = statusStars;
            this.state.statusAmenities = statusAmenities;
            this.state.selectedAmenities = selectedAmenities;

        } else {
            let today = moment();
            let tomorrow = moment().add(1, 'day');
            this.state = {
                occupancy: 1,
                from: today,
                until: tomorrow
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.getCityInfo = this.getCityInfo.bind(this);
        this.getFromDate = this.getFromDate.bind(this);
        this.getUntilDate = this.getUntilDate.bind(this);
        this.getPersons = this.getPersons.bind(this);
        this.getQueryUrl = this.getQueryUrl.bind(this);
        this.onSelectedStar = this.onSelectedStar.bind(this);
        this.onSelectedAmenity = this.onSelectedAmenity.bind(this);
        this.changeExpanded = this.changeExpanded.bind(this);
    }

    handleChange(address) {
        this.setState({address});
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
        this.setState({occupancy: event.target.value});
    }

    getQueryUrl() {
        let country = null
        let city = null;
        let from = null;
        let until = null;
        let stars = "";
        let amenities = "";
        if (this.state.city_info && this.state.city_info.address_components) {
            country = this.state.city_info.address_components.filter(component => component.types.includes('country'))[0].short_name;
            city = this.state.city_info.address_components.filter(component => component.types.includes('locality'))[0].long_name;
        }
        if (this.state.selectedStars && this.state.selectedStars.length !== 0) {
            stars = this.state.selectedStars.join("stars=");
        }
        if (this.state.selectedAmenities && this.state.selectedAmenities.length !== 0) {
            amenities = this.state.selectedAmenities.join("amenities=")
        }
        let occupancy = this.state.occupancy;

        if (this.state.from)
            from = this.state.from.format("YYYY-MM-DD");
        if (this.state.until)
            until = this.state.until.format("YYYY-MM-DD");
        let query = [];
        if (country) {
            query.push('country=' + country);
        }
        if (city) {
            query.push('city=' + city);
        }
        if (from) {
            query.push('from=' + from);
        }
        if (until) {
            query.push('until=' + until);
        }
        if (occupancy) {
            query.push('occupancy=' + occupancy);
        }
        if (stars) {
            query.push("stars=" + stars);
        }
        if (amenities) {
            query.push("amenities=" + amenities);
        }

        if (this.state.city_info && this.state.city_info.place_id) {
            query.push('placeId=' + this.state.city_info.place_id);
        }
        return query.join('&');
    }

    onSelectedStar(event) {
        const selectedValue = event.target.value;
        const preselectedStars = this.state.selectedStars;
        const status = this.state.statusStars;

        if (this.state.selectedStars.includes(selectedValue)) {
            preselectedStars.remove(selectedValue);
            status[selectedValue] = false;
        } else {
            preselectedStars.push(selectedValue);
            status[selectedValue] = true;
        }
        this.setState({selectedStars: preselectedStars, statusStars: status});
    }

    onSelectedAmenity(event) {
        const selectedValue = event.target.value;
        const preselectedAmenities = this.state.selectedAmenities;
        const status = this.state.statusAmenities;
        if (this.state.selectedAmenities.includes(selectedValue)) {
            preselectedAmenities.remove(selectedValue);
            status[selectedValue] = false;
        } else {
            preselectedAmenities.push(selectedValue);
            status[selectedValue] = true;
        }
        this.setState({selectedAmenities: preselectedAmenities, statusAmenities: status});
    }

    changeExpanded(id) {
        const panels = this.state.expansionPanels;
        panels[id] = !panels[id];
        this.setState(panels);
    }

    renderConditional(classes, isHome) {
        if (!isHome) {
            return (<Grid item xs={12}>
                <div>
                    <ExpansionPanel expanded={this.state.expansionPanels.starsPanel} className={classes.lightBlueRow}
                                    onChange={() => this.changeExpanded('starsPanel')}>
                        <ExpansionPanelSummary className={classes.noLeftPadding} aria-controls="panel1d-content"
                                               id="panel1d-header" expandIcon={<ExpandMoreIcon/>}>
                            <Typography>Estrellas</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails className={classes.panelDetails}>
                            <Grid item direction={'column'} xs={12} align={'left'} md={12}
                                  className={classes.formControlWrapper}>
                                {
                                    [5, 4, 3, 2, 1].map(v => {
                                        return (
                                            <div className={classes.rating}>
                                                <Checkbox value={v} color="primary"
                                                          checked={this.state.statusStars[v] || false}
                                                          onClick={this.onSelectedStar}/>
                                                <Box><Rating value={v} size={'large'} readOnly/></Box>
                                            </div>);
                                    })
                                }
                            </Grid>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </div>
                <div>
                    <ExpansionPanel expanded={this.state.expansionPanels.amenityPanel} className={classes.lightBlueRow}
                                    onChange={() => this.changeExpanded('amenityPanel')}>
                        <ExpansionPanelSummary className={classes.noLeftPadding} aria-controls="panel1d-content"
                                               id="panel1d-header" expandIcon={<ExpandMoreIcon/>}>
                            <Typography>Comodidades</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails className={classes.panelDetails}>
                            <Grid item direction={'column'} align={'left'} xs={12} md={12}
                                  className={classes.formControlWrapper}>
                                {
                                    this.state.amenities.map(amenity => {
                                        return (<Grid item className={classes.rating} xs={12} lg={12}><Checkbox
                                            value={amenity.id}
                                            checked={this.state.statusAmenities[amenity.id] || false}
                                            onChange={this.onSelectedAmenity}

                                            color="primary"/>

                                            <Typography>{amenity.description}</Typography>
                                        </Grid>)
                                    })
                                }
                            </Grid>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </div>

            </Grid>)
        }
    }


    render() {
        const {classes, isHome} = this.props;
        return (
            <div
                className={`${isHome ? classes.white_row : classes.lightBlueBody} ${isHome ? null : classes.maxWidth}`}>
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
                            minDate={this.state.from}
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
                                value={this.state.occupancy}
                                type={'number'}
                                id="component-outlined"
                                labelWidth={80}
                            />
                        </FormControl>
                    </Grid>
                    {this.renderConditional(classes, isHome)}
                    <Grid item direction={'column'} xs={12} md={isHome ? 2 : 12}
                          className={classes.formControlWrapper}>
                        <Button variant="contained"
                                href={`/Hotels?${this.getQueryUrl()}`}
                                className={`${classes.formControl} ${classes.formControlButton}`}
                                color="primary">
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
