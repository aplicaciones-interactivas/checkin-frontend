import React from 'react';
import Amenity from "./Amenity";

export class AmenityList extends React.Component {
    render() {
        const {amenities} = this.props;
        return (
            amenities.map(amenity => {
                return <Amenity amenity={amenity}/>
            })
        );
    }
}
