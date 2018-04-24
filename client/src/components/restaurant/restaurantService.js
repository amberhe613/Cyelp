// TODO: image return promise, either success or failure
export function createRestaurant(name, description, location, foodType, image) {
    // var newRestaurant = {     name: name,     address: {         "zipcode":
    // location     },     cuisine: foodType,     image: image }

    var formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('zipcode', location);
    formData.append('cuisine', foodType);
    formData.append('file', image);

    return fetch('/api/restaurant/new', {
        method: 'POST',
        credentials: "same-origin",
        // headers: {     'Accept': 'application/json',     'Content-Type':
        // 'multipart/form-data' },
        body: formData
    })
}

export function updateRestaurant(restaurantId, key, value) {
    var updateInfo = {
        restaurantId: restaurantId,
        [key]: value
    }

    return fetch('/api/restaurant/' + restaurantId + '/edit', {
        method: 'PUT',
        credentials: "same-origin",
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
        credentials: "same-origin",
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
        credentials: "same-origin",
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
        credentials: "same-origin",
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
        credentials: "same-origin",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
}

export function sortRestaurantByRating(restaurants) {
    return restaurants.sort((a, b) => {
        if (a.averageRating !== b.averageRating) {
            return b.averageRating - a.averageRating
        } else {
            return a.name < b.name
                ? -1
                : 1;
        }
    })
}

export function sortRestaurantBySavedNumber(restaurants) {
    return restaurants.sort((a, b) => {
        if (a.likedUserNumber !== b.likedUserNumber) {
            return b.likedUserNumber - a.likedUserNumber
        } else {
            return a.name < b.name
                ? -1
                : 1;
        }
    })
}

export function sortRestaurantByReviewedNumber(restaurants) {
    return restaurants.sort((a, b) => {
        if (a.reviewsNumber !== b.reviewsNumber) {
            return b.reviewsNumber - a.reviewsNumber
        } else {
            return a.name < b.name
                ? -1
                : 1;
        }
    })
}

export function saveRestaurant(restaurantId) {
    return fetch('/api/restaurant/' + restaurantId + '/save/', {
        method: 'PUT',
        credentials: "same-origin",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Content-Length': 0
        }
    })
}

export function markRestaurant(restaurantId, markBody) {
    return fetch('/api/restaurant/' + restaurantId + '/mark', {
        method: 'PUT',
        credentials: "same-origin",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Content-Length': 0
        },
        body: JSON.stringify(markBody)
    })
}

export function deleteRestaurant(restaurantId) {
    return fetch('/api/restaurant/' + restaurantId, {
        method: 'DELETE',
        credentials: "same-origin",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Content-Length': 0
        }
    })
}

export function ignoreRestaurant(restaurantId) {
    var queryBody = {
        deleteRequested: false
    }
    return markRestaurant(restaurantId, queryBody);
}
