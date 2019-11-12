import React from 'react';
import './App.css';
import Home from './components/Home';
import {BrowserRouter as Router} from 'react-router-dom';
import Route from 'react-router-dom/Route';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import NavBar from "./components/NavBar";
import Hotels from "./components/Hotels";

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


    return (
        <Router>
            <div className={"principal"}>
                <NavBar/>
                <Route path="/Hotels" exact strict component={HotelsComponent}/>
                <Route path="/" exact strict component={HomeComponent}/>
                <Route path="/SignIn" exact strict component={SignInComponent}/>
                <Route path="/SignUp" exact strict component={SignUpComponent}/>
            </div>
        </Router>
    );
}

export default App;
