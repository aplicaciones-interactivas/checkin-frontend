import React from 'react';
import {withStyles} from "@material-ui/core";
import PropTypes, {instanceOf} from "prop-types";
import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {Cookies, withCookies} from "react-cookie";

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
                    <Button color="inherit" href={'/reservas'}>Mis Reservas</Button>
                    <Button color="inherit" href={'/'}>Cerrar sesion</Button>
                </div>);
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
