import React from 'react';
import SvgIcon from "@material-ui/core/SvgIcon";
import Icon from "@material-ui/core/Icon";
import Tooltip from "@material-ui/core/Tooltip";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import Checkbox from "@material-ui/core/Checkbox";
import Box from "@material-ui/core/Box";
import Rating from "@material-ui/lab/Rating";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
    icon: {
        padding: theme.spacing(1),
    },
    '& img': {width: '30px'},
    alignChilds: {
        '& span': {
            verticalAlign: 'middle'
        }
    },
    fullWidth: {
        width: '100%'
    }
});

class Amenity extends React.Component {

    showDescription(amenity, showDescription) {
        console.log(showDescription)
        if (showDescription !== undefined) {
            return (<span><span>
                    {
                        amenity.description
                    }
            </span><br/></span>);
        }
        return null;
    }

    render() {
        const {amenity, classes, showDescription} = this.props;
        const iconPath = `/assets/icons/amenities/${amenity.code}.svg`;
        return (
            <span className={`${classes.alignChilds} ${showDescription ? classes.fullWidth : null}`}>
                <span>
                <Tooltip title={amenity.description}>
                    <Icon className={classes.icon}>
                        <img src={iconPath}/>
                    </Icon>
                </Tooltip>
                </span>
                {this.showDescription(amenity, showDescription)}
            </span>
        );
    }
}

Amenity.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Amenity);

