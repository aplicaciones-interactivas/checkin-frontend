import React from "react";
import {parse} from "query-string";
import Grid from "@material-ui/core/Grid";
import Buscador from "../components/Buscador";
import DateFnsUtils from "@date-io/date-fns";
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import {CheckinHotelApi} from "../api/CheckinHotelApi";
import HotelsList from "../components/HotelsList";
import NavBar from "../components/NavBar";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";

const styles = theme => ({
    deleteButton: {
        backgroundColor: 'red'
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(10, 0, 0, 0),
    },
});

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

    render() {
        const {classes} = this.props;
        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <NavBar/>
                <main className={classes.content}>
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
                </main>
            </MuiPickersUtilsProvider>);
    }
}

Hotels.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Hotels);
