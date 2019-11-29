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
import HotelInfo from "./views/HotelInfo";
import MisReservas from "./views/Reservations";
import Administration from "./views/abm/Administration";

Array.prototype.remove = function (element) {
    var index = this.indexOf(element);
    if (index > -1) {
        this.splice(index, 1);
    }
}

Array.prototype.removeByIndex = function (index) {
    if (index > -1) {
        this.splice(index, 1);
    }
}

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.updateUser = this.updateUser.bind(this);
    }

    updateUser(user) {
        this.setState({user: user});
    }

    render() {
        return (
            <Router>
                <div className={"principal"}>
                    <Route path="/Hotels" exact strict component={Hotels}/>
                    <Route path="/" exact strict component={Home}/>
                    <Route path="/SignIn" exact strict component={SignIn}/>
                    <Route path="/SignUp" exact strict component={SignUp}/>
                    <Route path={"/Reservation"} component={Reservation}/>
                    <Route path="/HotelInfo/:hotelId" component={HotelInfo}/>
                    <Route path="/Reservations" exact strict component={MisReservas}/>
                    <Route path="/Administration" exact strict component={Administration}/>
                </div>
            </Router>
        );
    }
}
