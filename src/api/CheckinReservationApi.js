import constants from "./ApiConstants";

export class CheckinReservationApi {
    calculateTotal(roomType, from, until) {
        return fetch(`${constants.SERVER_HOST}/reservation/calculateTotal?roomTypeId=${roomType}&from=${from}&until=${until}`)
            .then(res => res.json());
    }

    reserve(token, from, until, roomTypeId, mealPlanId) {
        const request = {
            from: from,
            until: until,
            roomTypeId: roomTypeId,
            mealPlanId: mealPlanId
        };

        return fetch(`${constants.SERVER_HOST}/reservation/`, {
            method: 'POST',
            body: JSON.stringify(request),
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
    }
}