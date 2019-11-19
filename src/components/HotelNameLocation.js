import React from "react";
import {Typography} from "@material-ui/core";

export default class HotelNameLocation extends React.Component {

    render() {
        const {hotel, country} = this.props;
        return (
            <Typography variant={'h4'}>
                {hotel ? hotel.name : ''} - {hotel ? hotel.city : ''} - {country}
            </Typography>
        )
    }
}
