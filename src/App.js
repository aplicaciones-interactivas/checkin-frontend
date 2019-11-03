import React from 'react';
import './App.css';
import Home from './components/Home';
import ImgMediaCard from './components/navMain';
import IntegrationReactSelect from './components/searchCountry';
import MaterialUIPickers from './components/datePicker';
import InputField from './components/inputPeople';
import Buttons from './components/primaryButton';
import TransitionsModal from './components/modal';
import FormControlLabelPosition from './components/checkBox';
import {BrowserRouter as Router} from 'react-router-dom';
import Route from 'react-router-dom/Route';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import HotelInfo from './components/hotelInfo';
import ButtonAppBar from './components/appBar';
import 'bootstrap/dist/css/bootstrap.min.css';

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

//const results = fetch('localhost:3200/Hoteles')


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
                <Route path="/InfoHotel" exact strict component={MoreInfo}/>
                <Route path="/" exact strict component={HomePage}/>
                <Route path="/SignIn" exact strict component={SigningIn}/>
                <Route path="/SignUp" exact strict component={SigningUp}/>
            </div>
        </Router>
    );
}

export default App;
