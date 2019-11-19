import React from 'react';
import './App.css';
import Home from './views/Home';
import {BrowserRouter as Router} from 'react-router-dom';
import Route from 'react-router-dom/Route';
import SignIn from './views/SignIn';
import SignUp from './views/SignUp';
import NavBar from "./components/NavBar";
import Hotels from "./views/Hotels";
import Reservation from "./views/Reservation";
import HotelInfo from "./components/hotelInfo";

Array.prototype.remove = function (element) {
    var index = this.indexOf(element);
    if (index > -1) {
        this.splice(index, 1);
    }
}

function App() {

    const HomeComponent = () => {
        return <Home/>;
    };

    const SignInComponent = () => {
        return <SignIn/>;
    };

    const SignUpComponent = () => {
        return <SignUp/>;
    };

    const HotelsComponent = () => {
        return <Hotels/>;
    };

    const ReservationComponent = () => {
        return <Reservation/>
    }

    const HotelInfoComponent = () => {
        return <HotelInfo/>;
    };


    return (
        <Router>
            <div className={"principal"}>
                <NavBar/>
                <Route path="/Hotels" exact strict component={HotelsComponent}/>
                <Route path="/" exact strict component={HomeComponent}/>
                <Route path="/SignIn" exact strict component={SignInComponent}/>
                <Route path="/SignUp" exact strict component={SignUpComponent}/>
                <Route path={"/Reservation"} component={ReservationComponent}/>
                <Route path="/HotelInfo" exact strict component={HotelInfoComponent}/>
            </div>
        </Router>
    );
}

export default App;
