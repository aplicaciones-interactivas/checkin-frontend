import constants from "./ApiConstants";

export default class CheckinAmenitiesApi {

    get() {
        return fetch(constants.SERVER_HOST + '/amenity')
            .then(res => res.json());
    }

}
