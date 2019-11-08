export default class CheckInPlacesApi {

    getPlaceDetails(id) {
        return fetch('http://localhost:3200/places/details/' + id,
            {
                method: 'GET',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                }
            }).then(res => res.json());
    }

    autocomplete(searchTerm) {
        return fetch('http://localhost:3200/places/autocomplete?searchTerm=' + searchTerm)
            .then(res => res.json());
    }

}
