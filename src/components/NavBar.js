import React from 'react';
import {withStyles} from "@material-ui/core";
import PropTypes, {instanceOf} from "prop-types";
import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {Cookies, withCookies} from "react-cookie";
import Redirect from "react-router-dom/es/Redirect";

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
});

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        const {cookies} = props.cookies;
        this.state = {
            token: cookies.token,
        }
        this.handleSingOut = this.handleSingOut.bind(this);

    }

    componentDidMount() {
        let token = this.state.token;
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
        event.preventDefault();
        this.setState({token: null, user: null});
        document.getElementById('sign-out-button').click();
    }

    navbarOptions() {
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
                    <Button color="inherit" href={'/Reservations'}>Mis Reservas</Button>
                    <Button id='sign-out-button' onClick={this.handleSingOut} color="inherit" href={'/'}>Cerrar
                        sesion</Button>
                </div>);
        } else if (this.state.user.roles && (this.state.user.roles.includes('ADMIN') || this.state.user.roles.includes('SUPERUSER'))) {
            return <Redirect to='/Administration'/>
        }
    }

    render() {
        const {classes} = this.props;
        return (<AppBar position="static">
            <div>{classes.title.flexGrow}</div>
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    Check-In
                </Typography>
                {this.navbarOptions()}
            </Toolbar>
        </AppBar>)
    }
}


NavBar.propTypes = {
    classes: PropTypes.object.isRequired,
    cookies: instanceOf(Cookies).isRequired
};

export default withStyles(styles)(withCookies(NavBar));
