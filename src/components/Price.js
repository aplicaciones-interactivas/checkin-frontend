import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import {Typography} from "@material-ui/core";
import {CheckinHotelApi} from "../api/CheckinHotelApi";
import Box from "@material-ui/core/Box";

const styles = theme => ({
    priceColor: {
        color: 'orange'
    },
    porNocheTypo: {
        size: '8px'
    }
});

class Price extends React.Component {

    constructor(props) {
        super(props);
        this.state = {price: ''}
        this.hotelApi = new CheckinHotelApi();
    }

    componentDidMount() {
        const {hotelId, from, until, occupancy} = this.props;
        this.hotelApi.getPrice(hotelId, from, until, occupancy)
            .then(price => this.setState({price: price.price}));
    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Box fontWeight="fontWeightBold" className={classes.priceColor}>$ {this.state.price}</Box>
                <Box fontSize={'10px'}>/por noche</Box>
            </div>
        )
    }

}

Price.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Price);
