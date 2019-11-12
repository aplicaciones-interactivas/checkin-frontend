import React from "react";
import {parse} from "query-string";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Buscador from "./Buscador";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import {CheckinHotelApi} from "../api/CheckinHotelApi";
import CheckinAmenitiesApi from "../api/CheckinAmenitiesApi";
import HotelBox from "./HotelBox";

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
    hotelRow: {
        marginTop: theme.spacing(1)
    }
});


class Hotels extends React.Component {

    constructor(props) {
        super(props);
        this.state = {search: parse(window.location.search)};
    }

    componentDidMount() {
        fetch('http://localhost:3200/hotel' + window.location.search, {
            mode: "cors"
        }).then(res => res.json())
            .then(data => this.setState({hotels: data}));
    }

    render() {
        const {classes} = this.props;
        return (<MuiPickersUtilsProvider utils={DateFnsUtils}>
            <div>
                <Grid container direction={'row'}
                      align="center"
                      justify="center">
                    <Grid item direction={'column'} xs={12} md={12} lg={3}>
                        <Buscador isHome={false} initialData={this.state.search}/>
                    </Grid>
                    <Grid item direction={'column'} className={classes.hotelRow} xs={12} md={12} lg={9}>
                        <HotelBox></HotelBox>
                    </Grid>
                </Grid>
            </div>
        </MuiPickersUtilsProvider>);
    }

}

Hotels.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Hotels);
