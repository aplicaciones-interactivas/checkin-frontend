import constants from "./ApiConstants";

export default class CheckInPlacesApi {

    getPlaceDetails(id) {
        return fetch(constants.SERVER_HOST + '/places/details/' + id,
            {
                method: 'GET',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                }
            }).then(res => res.json());
    }

    autocomplete(searchTerm) {
        return fetch(constants.SERVER_HOST + '/places/autocomplete?searchTerm=' + searchTerm)
            .then(res => res.json());
    }

}
