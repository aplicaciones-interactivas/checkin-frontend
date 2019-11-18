import constants from "./ApiConstants";

export default class CheckInRoomTypeApi {

    findByIdAndHotelId(id, hotelId) {
        return fetch(`${constants.SERVER_HOST}/room-type/hotel/${hotelId}/${id}`)
            .then(res => res.json());
    }

}
