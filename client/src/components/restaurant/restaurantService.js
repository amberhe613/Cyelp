// TODO: image return promise, either success or failure
export function createRestaurant(name, location, foodType) {
    var newRestaurant = {
        name: name,
        address: {
            zipcode: location
        },
        cuisine: foodType
    }

    return fetch('/api/restaurant/new', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newRestaurant)
    })
}

export function updateRestaurant(restaurantId, key, value) {
    var updateInfo = {
        restaurantId: restaurantId,
        [key]: value
    }

    return fetch('/api/restaurant/' + restaurantId + '/edit', {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateInfo)
    })
}

export function reviewRestaurant(userId, restaurantId, rating, cost) {
    var rateInfo = {
        userId: userId,
        rating: rating,
        cost: cost
    }

    fetch('/restaurants/' + restaurantId, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(rateInfo)
    })
}

/**
 *
 * @param {} queryBody: {cuisine: "sichuan", averageRating: {$gte: 3.5}, address.zipcode: '94100'}
 * @returns {restaurants: [{}]}
 */
export function findRestaurant(queryBody) {
    return fetch('/api/restaurant', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
            body: JSON.stringify(queryBody)
        })
        .then(res => res.json())
        .catch(err => {
            console.log("restaurantService 71")
        })
}

export function findRestaurantReviews(restaurantId) {
    return fetch('/api/restaurant/' + restaurantId + '/reviews', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then((res) => res.json())
}

// TODO: return a promise, catch error in the called function
export function findRestaurantById(restaurantId) {
    return fetch('/api/restaurant/' + restaurantId, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
}

export function sortRestaurantByRating(restaurants) {
    return restaurants.sort((a, b) => {
        if (a.averageRating !== b.averageRating) {
            return a.averageRating - b.averageRating
        } else {
            if (a.averagePrice !== b.averagePrice) {
                return a.averagePrice - b.averagePrice
            } else {
                return a.name - b.name
            }
        }
    })
}

export function sortRestaurantByPrice(restaurants) {
    return restaurants.sort((a, b) => {
        if (a.averagePrice !== b.averagePrice) {
            return a.averagePrice - b.averagePrice
        } else {
            if (a.averageRating !== b.averageRating) {
                return a.averageRating - b.averageRating
            } else {
                return a.name - b.name
            }
        }
    })
}

export function saveRestaurant(restaurantId) {
    return fetch('/api/restaurant/' + restaurantId + '/save/', {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Content-Length': 0
        }
    })
}