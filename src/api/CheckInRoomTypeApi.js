import constants from "./ApiConstants";

export default class CheckInRoomTypeApi {

    findByIdAndHotelId(id, hotelId) {
        return fetch(`${constants.SERVER_HOST}/room-type/hotel/${hotelId}/${id}`)
            .then(res => res.json());
    }

    findAvailableForHotelId(hotelId, from, until, occupancy) {
        return fetch(`${constants.SERVER_HOST}/room-type/availables?hotelId=${hotelId}&from=${from}&until=${until}&occupancy=${occupancy}`)
            .then(res => res.json());
    }

    findByUser(token) {
        return fetch(`${constants.SERVER_HOST}/room-type/`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(res => res.json());
    }

    create(body, token) {
        return fetch(`${constants.SERVER_HOST}/room-type`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })

    }

    update(id, body, token) {
        return fetch(`${constants.SERVER_HOST}/room-type/${id}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
    }

    addRooms(body, token) {
        return fetch(`${constants.SERVER_HOST}/room`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })

    }
}
