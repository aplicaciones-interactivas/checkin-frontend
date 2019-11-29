export default class GooglePlacesService {


    constructor() {
        this.apikey = "AIzaSyCr93elOowQMq5CQulQLhXLhsJhMR6BIRY";
    }

    getPlace(placeId) {
        return new Promise((resolve, reject) => {
            fetch('https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?key=' + this.apikey + '&place_id=' + placeId,
                {
                    method: 'GET',
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest'
                    }
                }).then(res => res.json())
                .then(data => {
                    console.log(data);
                    resolve(data.result)
                }).catch(reject);
        })

    }

}
