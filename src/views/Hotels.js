import React from "react";
import {parse} from "query-string";
import Grid from "@material-ui/core/Grid";
import Buscador from "../components/Buscador";
import DateFnsUtils from "@date-io/date-fns";
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import {CheckinHotelApi} from "../api/CheckinHotelApi";
import HotelsList from "../components/HotelsList";

export default class Hotels extends React.Component {

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
