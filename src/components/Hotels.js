import React from "react";
import {parse} from "query-string";
import Grid from "@material-ui/core/Grid";
import Buscador from "./Buscador";
import PropTypes from "prop-types";
import {Box, Card, CardContent, Paper, withStyles} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import {CheckinHotelApi} from "../api/CheckinHotelApi";
import CircularProgress from "@material-ui/core/CircularProgress";
import SnackbarContentWrapper from "./SnackbarContentWrapper";
import HotelImage from "./HotelImage";
import CardMedia from "@material-ui/core/CardMedia";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import HotelsList from "./HotelsList";


const styles = theme => ({});


class Hotels extends React.Component {

    constructor(props) {
        super(props);
        this.hotelApi = new CheckinHotelApi();
        this.state = {search: parse(window.location.search)};
    }

    componentDidMount() {
        this.hotelApi.getFilterHotels(window.location.search)
            .then(data => this.setState({hotels: data}));
    }

    renderHotelBoxes(hotels) {
        return
    }

    render() {
        return (<MuiPickersUtilsProvider utils={DateFnsUtils}>
            <div>
                <Grid container>
                    <Grid container direction={'column'} xs={12} lg={3}>
                        <Buscador isHome={false} initialData={this.state.search}/>
                    </Grid>
                    <Grid container xs={12} lg={9}>
                        <Grid item xs={12}>
                            <HotelsList hotels={this.state.hotels} search={this.state.search}/>
                        </Grid>
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
