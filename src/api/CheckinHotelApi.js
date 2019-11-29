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

    update(hotel, imagesToDelete, imagesToAdd, originalAmenitiesId, token) {
        const body = {
            name: hotel.name,
            contactEmail: hotel.contactEmail,
            primaryContactPhone: hotel.primaryContactPhone,
            checkinTime: hotel.checkinTime,
            checkoutTime: hotel.checkoutTime,
            stars: hotel.stars,
            category: hotel.category,
            country: hotel.country,
            city: hotel.city,
            address: hotel.address,
            amenitiesId: hotel.amenitiesId,
            removeAmenitiesId: originalAmenitiesId
        }


        return fetch(`${constants.SERVER_HOST}/hotel/${hotel.id}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(res => res.json())
            .then(data => {
                if (imagesToAdd.length !== 0) {
                    const formData = new FormData();
                    imagesToAdd.forEach((image) => {
                        formData.append("files", image);
                    })
                    fetch(`${constants.SERVER_HOST}/hotel-images/${hotel.id}`, {
                        method: 'POST',
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        body: formData
                    }).then(() => data);
                }
            }).then(() => {
                if (imagesToDelete.length !== 0) {
                    const query = imagesToDelete.join('&ids=')
                    fetch(`${constants.SERVER_HOST}/hotel-images?ids=${query}`, {
                        method: 'DELETE',
                        headers: {
                            Authorization: `Bearer ${token}`,

                        }
                    })
                }
            })
    }

    create(hotel, images, token) {
        return fetch(`${constants.SERVER_HOST}/hotel`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(hotel)
        })
            .then(res => res.json())
            .then((data) => {
                const formData = new FormData();
                images.forEach((image) => {
                    formData.append("files", image);
                })

                fetch(`${constants.SERVER_HOST}/hotel-images/${data.id}`, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: formData
                }).then(() => data);
            });
    }

    addMealPlan(id, req, token) {
        return fetch(`${constants.SERVER_HOST}/hotel/${id}/mealPlan`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req)
        })
    }

    updateMealPlan(hotelId, mealPlanId, req, token) {
        return fetch(`${constants.SERVER_HOST}/hotel/${hotelId}/mealPlan/${mealPlanId}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req)
        })
    }
}
