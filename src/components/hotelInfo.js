import React from 'react';
import HotelImage from './HotelImage';
import Grid from "@material-ui/core/Grid";
import {CheckinHotelApi} from "../api/CheckinHotelApi";
import {parse} from 'query-string';
import { withStyles } from '@material-ui/styles';
import {AmenityList} from "./AmenityList";
import Rating from "@material-ui/lab/Rating";
import PropTypes from "prop-types";
import Table from './Table';
import {Card, CardContent} from "@material-ui/core";

const styles = theme => ({

});


class HotelInfo extends React.Component {

    constructor(props) {
        super(props);
        this.hotelApi = new CheckinHotelApi();
        const search = parse(window.location.search);
        this.state = {search:search}
        this.componentDidMount = this.componentDidMount.bind(this)
    }


    componentDidMount() {
        this.hotelApi.getHotelByID(this.state.search.id)
            .then(data => this.setState({hotel: data}));
    }    

    render() {
        const images = [
            {
              original: 'https://picsum.photos/id/1018/1000/600/',
              thumbnail: 'https://picsum.photos/id/1018/250/150/',
            },
            {
              original: 'https://picsum.photos/id/1015/1000/600/',
              thumbnail: 'https://picsum.photos/id/1015/250/150/',
            },
            {
              original: 'https://picsum.photos/id/1019/1000/600/',
              thumbnail: 'https://picsum.photos/id/1019/250/150/',
            },
          ];
          const {classes} = this.props;
          
          const amens = [
            {
                beach: 'beach'
            }
        ];

        return (
           <Card>
            <CardContent>
                <Grid container direction="column" lg={10}>
                    <Grid item xs={3} lg={12}>
                        <HotelImage isGrid={true} images={images} />
                    </Grid>
                    <Grid container xs={3} lg={12} direction="row" alignItems="center" justify={'flex-start'} spacing={1}>
                        <Grid item><h2>SHERATON - </h2></Grid>
                        <Grid item><h3>Buenos Aires - </h3></Grid>
                        <Grid item><h3>Argentina</h3></Grid>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Rating value={3} size={'large'} readOnly/>
                    </Grid>
                    <Grid item xs={12} md={12} direction="column">
                        <p>Facilidades</p>
                        <AmenityList amenities={amens}/>
                    </Grid>
                    <Grid item>
                        <p>Habitaciones</p>
                        <Table/>
                    </Grid>
                </Grid>
            </CardContent>
           </Card>
        )
    }
}


HotelInfo.propTypes = {
    classes: PropTypes.object.isRequired,
};
//<Rating value={this.state.hotel.stars} size={'large'} readOnly/> 
//<AmenityList amenities={this.state.hotel.amenities}/>
//<HotelImage isGrid={false} images={this.state.hotel.__hotelImages__}/>
export default withStyles(styles)(HotelInfo);