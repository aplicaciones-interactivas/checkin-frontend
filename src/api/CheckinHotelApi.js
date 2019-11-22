import constants from "./ApiConstants";

export class CheckinHotelApi {

    getFilterHotels(filters) {
        return fetch(constants.SERVER_HOST + '/hotel' + filters, {
            method: 'GET',
            headers: {
                'X-Requested-With': 'XMLHttpRequest'

            }
        }).then(res => res.json());
    }

    getPrice(idHotel, from, until, occupancy) {
        return fetch(`${constants.SERVER_HOST}/hotel/price?hotelId=${idHotel}&from=${from}&until=${until}&occupancy=${occupancy}`)
            .then(r => r.json());
    }

    getById(id) {
        return fetch(`${constants.SERVER_HOST}/hotel/id/${id}`)
            .then(res => res.json());
    }

    getMealPlansById(id) {
        return fetch(`${constants.SERVER_HOST}/hotel/${id}/mealPlan`)
            .then(res => res.json());
    }

    getByUser(token) {
        return fetch(`${constants.SERVER_HOST}/hotel/user`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => res.json());

    }

    delete(id, token) {
        return fetch(`${constants.SERVER_HOST}/hotel/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }
}
