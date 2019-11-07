import React from 'react';
import './App.css';
import Home from './components/Home';
import {BrowserRouter as Router} from 'react-router-dom';
import Route from 'react-router-dom/Route';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import HotelInfo from './components/hotelInfo';
import NavBar from "./components/NavBar";

function App() {

    const HomePage = () => {
        return <Home/>;
    };

    const SigningIn = () => {
        return <SignIn/>;
    };

    const SigningUp = () => {
        return <SignUp/>;
    };


    return (
        <Router>
            <div class="principal">
                <NavBar/>
                <Route path="/Hotels" exact strict component={[]}/>
                <Route path="/" exact strict component={HomePage}/>
                <Route path="/SignIn" exact strict component={SigningIn}/>
                <Route path="/SignUp" exact strict component={SigningUp}/>
            </div>
        </Router>
    );
}

export default App;
