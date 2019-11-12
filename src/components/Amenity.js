import React from 'react';
import SvgIcon from "@material-ui/core/SvgIcon";
import Icon from "@material-ui/core/Icon";
import Tooltip from "@material-ui/core/Tooltip";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";

const styles = theme => ({
    icon: {
        padding: theme.spacing(1)
    }
});

class Amenity extends React.Component {
    render() {
        const {amenity, classes} = this.props;
        const iconPath = `/assets/icons/amenities/${amenity.code}.svg`;
        return (
            <Tooltip title={amenity.description}>
                <Icon className={classes.icon}>
                    <img src={iconPath}/>
                </Icon>
            </Tooltip>
        );
    }
}

Amenity.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Amenity);

