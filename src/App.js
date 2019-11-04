import React from 'react';
import './App.css';
import Home from './components/Home';
import {BrowserRouter as Router} from 'react-router-dom';
import Route from 'react-router-dom/Route';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import HotelInfo from './components/hotelInfo';
import {makeStyles} from "@material-ui/core";
import NavBar from "./components/NavBar";

const styles = makeStyles(theme => ({
    title: {
        flexGrow: 1,
    },
}));


function App() {
    const results = [
        {
            nombre: "Sheraton",
            precio: "150",
            ubicacion: "Buenos Aires",
            estrellas: "5"
        },
        {
            nombre: "Hilton",
            precio: "100",
            ubicacion: "Rosario",
            estrellas: "5"
        },
        {
            nombre: "Milton",
            precio: "100",
            ubicacion: "Cordoba",
            estrellas: "3"
        },
        {
            nombre: "Los Andes Apart",
            precio: "100",
            ubicacion: "Misiones",
            estrellas: "3"
        },
        {
            nombre: "Pestilloso",
            precio: "100",
            ubicacion: "Jujuy",
            estrellas: "1"
        },
        {
            nombre: "Howard Jhonson",
            precio: "100",
            ubicacion: "Buenos Aires",
            estrellas: "5"
        },
    ]

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const HomePage = () => {
        return <Home/>;
    };

    const SigningIn = () => {
        return <SignIn/>;
    };

    const SigningUp = () => {
        return <SignUp/>;
    };

    const MoreInfo = (props) => {
        return <HotelInfo p={props.location.hotelInfo}/>;
    };

    return (
        <Router>
            <div class="principal">
                <NavBar/>
                <Route path="/InfoHotel" exact strict component={MoreInfo}/>
                <Route path="/" exact strict component={HomePage}/>
                <Route path="/SignIn" exact strict component={SigningIn}/>
                <Route path="/SignUp" exact strict component={SigningUp}/>
            </div>
        </Router>
    );
}

export default App;
