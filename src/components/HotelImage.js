import React from "react";
import Carousel from "react-material-ui-carousel";
import constants from "../api/ApiConstants";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import Box from "@material-ui/core/Box";

const styles = theme => ({
    media: {
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            height: '20vh'
        },
        [theme.breakpoints.up('md')]: {
            height: '25vh'
        },
        backgroundSize: 'contains'
    },
    mediaNoList: {
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            height: '50vh'
        },
        [theme.breakpoints.up('md')]: {
            height: '50vh'
        },
        backgroundSize: 'contain'
    },
    nofoto: {
        border: 'black',
        backgroundSize: 'cover'
    }
});

class HotelImage extends React.Component {

    constructor(props) {
        super(props);
        this.getImages = this.getImages.bind(this);
    }

    getImages() {
        const {images, classes, isGrid} = this.props;
        if (images.length === 0) {
            return <Box border={1} borderColor="grey.500"><CardMedia
                className={`${isGrid ? classes.mediaNoList : classes.media} ${classes.nofoto}`}
                image={`/assets/images/nofoto.jpg`}></CardMedia></Box>
        } else {
            return images.map(image => {
                return <CardMedia className={isGrid ? classes.mediaNoList : classes.media}
                                  image={`${image.path}`}></CardMedia>
            })
        }

    }

    render() {

        return (
            <Carousel animation={'fade'}>{
                this.getImages()
            }
            </Carousel>
        );
    }
}


HotelImage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HotelImage);

