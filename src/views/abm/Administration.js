import React from 'react';
import NavBar from "../../components/NavBar";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ApartmentIcon from '@material-ui/icons/Apartment';
import PropTypes from "prop-types";
import {Box, withStyles} from "@material-ui/core";
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import RoomIcon from '@material-ui/icons/Room';
import HotelList from "./hotels/HotelList";

const styles = (theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: 240,
        flexShrink: 0,
    },
    drawerPaper: {
        width: 240,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    toolbar: theme.mixins.toolbar,
});

class Administration extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.onClickOption = this.onClickOption.bind(this);
        this.bodyRender = this.bodyRender.bind(this);
    }

    onClickOption(view) {
        this.setState({view: view})
    }

    bodyRender() {
        if (this.state.view === 'hotels') {
            return (<HotelList/>)
        } else if (this.state.view === 'roomTypes') {
            return null;
        } else if (this.state.view === 'rooms') {
            return null;
        } else {
            return null;
        }
    }


    render() {
        const {classes} = this.props;
        return (
            <span>
            <div className={classes.root}>
                <NavBar className={classes.appBar}/>
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.toolbar}/>
                    <List>
                        <ListItem button key={"hotels"} onClick={() => this.onClickOption('hotels')}>
                            <ListItemIcon><ApartmentIcon/></ListItemIcon>
                            <ListItemText primary={'Hoteles'}/>
                        </ListItem>
                        <ListItem button key={"roomTypes"} onClick={() => this.onClickOption('roomTypes')}>
                            <ListItemIcon><MeetingRoomIcon/></ListItemIcon>
                            <ListItemText primary={'Tipos de habitacion'}/>
                        </ListItem>
                        <ListItem button key={"rooms"} onClick={() => this.onClickOption('rooms')}>
                            <ListItemIcon><RoomIcon/></ListItemIcon>
                            <ListItemText primary={'Habitaciones'}/>
                        </ListItem>
                    </List>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.toolbar}/>
                    {
                        this.bodyRender()
                    }
                </main>
            </div>

            </span>
        );
    }
}

Administration.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Administration);
