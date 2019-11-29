import constants from "./ApiConstants";

export class CheckinHotelMealPlanApi {
    getByUser(token) {
        return fetch(`${constants.SERVER_HOST}/meal-plan`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(res => res.json());
    }

    getAll() {
        return fetch(`${constants.SERVER_HOST}/meal-plan/all`)
            .then(res => res.json());
    }

    findById(id) {
        return fetch(`${constants.SERVER_HOST}/meal-plan/id/${id}`)
            .then(res => res.json());
    }
}
