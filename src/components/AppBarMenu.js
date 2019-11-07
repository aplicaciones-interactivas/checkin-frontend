import React, {useEffect} from 'react';
import {fade, makeStyles, withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import Button from "@material-ui/core/Button";
import cookie from "react-cookies";
import PropTypes, {instanceOf} from "prop-types";
import {Cookies, withCookies} from "react-cookie";
import {NavLink, withRouter} from "react-router-dom";

const styles = theme => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    black: {
        color: 'black'
    }
});

class AppBarMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            mobileMoreAnchorEl: null,
            user: null,
            isMenuOpen: true,
            isMobileMenuOpen: Boolean(this.mobileMoreAnchorEl)
        }
        this.navbarOptionsMobile = this.navbarOptionsMobile.bind(this);
        this.handleMobileMenuOpen = this.handleMobileMenuOpen.bind(this);
        this.handleMobileMenuClose = this.handleMobileMenuClose.bind(this);
        this.handleSingOut = this.handleSingOut.bind(this);
    }

    componentDidMount() {
        const token = cookie.load('token');
        if (token) {
            fetch('http://localhost:3200/user/profile', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                mode: 'cors'
            }).then(res => res.json())
                .then(data => {
                    if (!data.error) {
                        this.setState({user: data});
                    }
                });
        }
    }

    handleSingOut(event) {
        this.setState({token: null, user: null});
        cookie.remove('token');
    }

    navbarOptionsMobile() {
        const {classes} = this.props;
        if (!this.state.user) {
            return (
                <div>
                    <MenuItem>
                        <NavLink to={'/SignIn'}
                                 className={classes.black} onClick={this.handleMobileMenuClose}>INGRESAR</NavLink>
                    </MenuItem>
                    <MenuItem>
                        <NavLink to={'/SignUp'}
                                 className={classes.black} onClick={this.handleMobileMenuClose}>REGISTRARSE</NavLink>
                    </MenuItem>
                </div>
            );
        } else if (this.state.user.roles && this.state.user.roles.includes('USER')) {
            return (
                <div>
                    <MenuItem>
                        <NavLink to={'/Profile'}
                                 className={classes.black} onClick={this.handleMobileMenuClose}>{this.state.user.name + ' ' + this.state.user.lastname}</NavLink>
                    </MenuItem>
                    <MenuItem>
                        <NavLink to={'/Reservations'} className={classes.black}  onClick={this.handleMobileMenuClose}>Mis Reservas</NavLink>
                    </MenuItem>
                    <MenuItem>
                        <NavLink onClick={this.handleSingOut} to={'/'} className={classes.black}>Cerrar
                            sesion</NavLink>
                    </MenuItem>
                </div>);
        } else if (this.state.user.roles && (this.state.user.roles.includes('ADMIN') || this.state.user.roles.includes('SUPERUSER'))) {
            if (window.location.pathname === '/') {
                window.location.pathname = '/Administration';
            } else {
                return (
                    <div>
                        <MenuItem>
                            <NavLink to={'/Profile'} className={classes.black} onClick={this.handleMobileMenuClose}>{this.state.user.name}</NavLink>
                        </MenuItem>
                        <MenuItem>
                            <NavLink to={'/Administration'} className={classes.black} onClick={this.handleMobileMenuClose}>Administracion</NavLink>
                        </MenuItem>
                        <MenuItem>
                            <NavLink to={'/'} onClick={this.handleSingOut} className={classes.black} onClick={this.handleMobileMenuClose}>Cerrar sesion</NavLink>
                        </MenuItem>
                    </div>);
            }
        }
    }

    handleMobileMenuClose() {
        this.setState({mobileMoreAnchorEl: null, isMobileMenuOpen: false})
    }

    handleMobileMenuOpen(event) {
        this.setState({mobileMoreAnchorEl: event.currentTarget, isMobileMenuOpen: true})
    }

    renderMobile() {
        const mobileMenuId = 'primary-search-account-menu-mobile';
        return (
            <Menu
                anchorEl={this.state.mobileMoreAnchorEl}
                anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                id={mobileMenuId}
                keepMounted
                transformOrigin={{vertical: 'top', horizontal: 'right'}}
                open={this.state.isMobileMenuOpen}
                onClose={this.handleMobileMenuClose}
            >
                {this.navbarOptionsMobile()}
            </Menu>
        );
    }

    navbarOptionsDesktop() {
        if (!this.state.user) {
            return (
                <div>
                    <Button color="inherit" href={'/SignIn'}>Ingresar</Button>
                    <Button color="inherit" href={'/SignUp'}>Registrarse</Button>
                </div>
            );
        } else if (this.state.user.roles && this.state.user.roles.includes('USER')) {

            return (
                <div>
                    <Button color="inherit"
                            href={'/Profile'}>{this.state.user.name + ' ' + this.state.user.lastname}</Button>
                    <Button color="inherit" href={'/Reservations'}>Mis Reservas</Button>
                    <Button id='sign-out-button' onClick={this.handleSingOut} color="inherit" href={'/'}>Cerrar
                        sesion</Button>
                </div>);
        } else if (this.state.user.roles && (this.state.user.roles.includes('ADMIN') || this.state.user.roles.includes('SUPERUSER'))) {
            if (this.state.location === '/') {
                window.location.pathname = '/Administration';
            } else {
                return (
                    <div>
                        <Button color="inherit" href={'/Profile'}>Perfil ${this.state.user.name}</Button>
                        <Button color="inherit" href={'/Administration'}>Administracion</Button>
                        <Button id='sign-out-button' onClick={this.handleSingOut} color="inherit" href={'/'}>Cerrar
                            sesion</Button>
                    </div>);
            }
        }
    }


    render() {
        const {classes} = this.props;
        const mobileMenuId = 'primary-search-account-menu-mobile';
        return (
            <div>
                <div className={classes.sectionDesktop}>
                    {this.navbarOptionsDesktop()}
                </div>
                <div className={classes.sectionMobile}>
                    <IconButton
                        aria-label="show more"
                        aria-controls={mobileMenuId}
                        aria-haspopup="true"
                        onClick={this.handleMobileMenuOpen}
                        color="inherit"
                    >
                        <MoreIcon/>
                    </IconButton>
                </div>
                {this.renderMobile()}
            </div>
        );

    }
}

AppBarMenu.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(AppBarMenu));
