export default class CheckinUserApi {

    login(request) {
        return fetch('http://localhost:3200/auth/login', {
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
        return fetch('http://localhost:3200/user/profile', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            mode: 'cors'
        }).then(res => res.json())
    }

}
