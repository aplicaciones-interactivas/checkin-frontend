import constants from "./ApiConstants";

export class CheckinReservationApi {
    calculateTotal(roomType, from, until) {
        return fetch(`${constants.SERVER_HOST}/reservation/calculateTotal?roomTypeId=${roomType}&from=${from}&until=${until}`)
            .then(res => res.json());
    }
}
