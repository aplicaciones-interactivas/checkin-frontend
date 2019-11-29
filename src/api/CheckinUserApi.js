import constants from "./ApiConstants";

export default class CheckinUserApi {

    login(request) {
        return fetch(`${constants.SERVER_HOST}/auth/login`, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(request),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.ok) return res.json();
            else throw Error(res.json().statusText);
        });
    }

    profile(token) {
        return fetch(`${constants.SERVER_HOST}/user/profile`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            mode: 'cors'
        }).then(res => res.json())
    }

    signUp(request){
        return fetch(`${constants.SERVER_HOST}/auth/signup`, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(request),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

}
