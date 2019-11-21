import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Copyright} from "../components/Copyright";
import PropTypes, {instanceOf} from "prop-types";
import cookie from 'react-cookies'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ErrorBox from "../components/ErrorBox";
import {parse} from "query-string";
import {Redirect} from "react-router-dom";

const useStyles = theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: "#3f51b5",
    },
    submit: {
        margin: theme.spacing(2, 0, 2),
    },
    error: {
        backgroundColor: theme.palette.error.light,
        padding: theme.spacing(3, 2)
    }
});

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = this.props.location.state;

        this.conditionalRender = this.conditionalRender.bind(this);
    }

    handleChange(field) {
        this.setState({[field.target.name]: field.target.value});
    }

    handleOnSubmit(event) {
        event.preventDefault();
        const request = {
            username: this.state.username,
            password: this.state.password
        }
        fetch('http://localhost:3200/auth/login', {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(request),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.ok) return res.json();
            else throw Error(res.json().statusText);
        })
            .then(data => {
                cookie.save('token', data.accessToken);
                this.setState({logged: true});
            })
            .catch(err => this.setState({error: 'Revisa tu usuario y contraseña'}));
    }

    conditionalRender() {
        const {classes} = this.props;
        if (this.state.logged) {
            if (this.state.action) {
                return (<Redirect to={{
                    pathname: 'Reservation',
                    state: this.state
                }}/>);
            } else {
                return (<Redirect to={'/'}/>)
            }
        } else {
            return (<Container component="main" maxWidth="xs">
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <AccountCircleIcon/>
                    </Avatar>
                    <form onSubmit={this.handleOnSubmit} onChange={this.handleChange} className={classes.form}>
                        <ErrorBox message={this.state.error}></ErrorBox>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Nombre de usuario o email"
                            name="username"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Contraseña"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            onClick={this.handleOnSubmit}
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Entrar
                        </Button>
                        <Grid container justify="center">
                            <Grid item>
                                <Link href="/SignUp" variant="body2">
                                    {"¿No tenes cuenta? Registrate"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Box mt={8}>
                    <Copyright/>
                </Box>
            </Container>);
        }
    }


    render() {

        return (<span>
            {
                this.conditionalRender()
            }
        </span>);
    }
}

SignIn.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(SignIn);
