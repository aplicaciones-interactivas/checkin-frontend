import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Copyright} from "./Copyright";
import PropTypes, {instanceOf} from "prop-types";
import cookie from 'react-cookies'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ErrorBox from "./ErrorBox";

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

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {};

    }

    handleChange(field) {
        this.setState({[field.target.name]: field.target.value});
    }

    handleOnSubmit(event) {
        event.preventDefault();
        const request = {
            username: this.state.username,
            password: this.state.password,
            name: this.state.name,
            lastname: this.state.lastname,
            email: this.state.email
        }
        fetch('http://localhost:3200/auth/signup', {
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
                window.location.pathname = '/Signin';
            })
            .catch(err => this.setState({error: 'Revisa los datos ingresados'}));
    }

    render() {
        const {classes} = this.props;
        return (<Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <AccountCircleIcon/>
                </Avatar>
                <form className={classes.form} onChange={this.handleChange} onSubmit={this.handleOnSubmit}>
                    <ErrorBox message={this.state.error}></ErrorBox>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="fname"
                                name="name"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="Nombre"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Apellido"
                                name="lastName"
                                autoComplete="lname"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                inputProps={{minLength: 8, maxLength: 20}}
                                id="username"
                                label="Nombre de usuario"
                                name="username"
                                autoComplete="lname"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                type={'email'}
                                id="email"
                                label="Email"
                                name="email"
                                validators={['required', 'isEmail']}
                                errorMessages={['this field is required', 'email is not valid']}
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                inputProps={{
                                    pattern: "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\\s).*$",
                                    minLength: 8,
                                    maxLength: 20,
                                    title: 'La contraseña debe tener al menos 8 caracteres, y al menos 1 letra minuscula, 1 letra mayuscula y 1 numero'
                                }}
                                name="password"
                                label="Contraseña"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Registrarse
                    </Button>
                    <Grid container justify="center">
                        <Grid item>
                            <Link href="/Signin" variant="body2">
                                ¿Ya tenes una cuenta? Ingresa
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

SignUp.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(SignUp);
