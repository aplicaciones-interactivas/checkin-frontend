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


const styles = theme => ({
    hotelRow: {
        margin: theme.spacing(1),
    },
    card: {
        [theme.breakpoints.down('sm')]: {
            height: '350px',
        },
        [theme.breakpoints.up('lg')]: {
            height: '240px'
        }
    },
    spinner: {
        marginTop: theme.spacing(5)
    },
    snackBar: {
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        width: '100%'
    }
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

    renderHotelBoxes(hotels) {
        const {classes} = this.props;
        console.log(hotels);
        if (hotels) {
            if (hotels.length === 0) {
                return (<SnackbarContentWrapper message={"No encontramos ningun hotel disponible"}
                                                variant={'warning'}></SnackbarContentWrapper>);
            } else {
                return hotels.map(hotel => {
                    return (
                        <Grid className={classes.hotelRow} item xs={12}>
                            <Card
                                className={classes.card}>
                                <CardContent>
                                    <Grid item xs={12} lg={3}>
                                        <HotelImage isGrid={true} images={hotel.__hotelImages__}/>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    )
                });
            }
        } else {
            return <Grid align={'center'} className={classes.spinner} item xs={12}><CircularProgress/></Grid>;
        }
    }

    render() {
        const {classes} = this.props;
        return (<MuiPickersUtilsProvider utils={DateFnsUtils}>
            <div>
                <Grid container>
                    <Grid container direction={'column'} xs={12} lg={3}>
                        <Buscador isHome={false} initialData={this.state.search}/>
                    </Grid>
                    <Grid container xs={12} lg={9}>
                        <Grid item xs={12}>
                            {
                                this.renderHotelBoxes(this.state.hotels)
                            }
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
