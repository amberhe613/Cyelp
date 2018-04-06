export function createRestaurant(userId, name, location, foodType) {
    var d = new Date();
    var newRestaurant = {
        name: name,
        location: location,
        foodType: foodType,
        userId: userId,
        addedDate: d.getDate(),
        rateTimes: 0,
        averageRating: 0,
        averagePrice: 0
    }

    fetch('/restaurants/new', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
            body: JSON.stringify(newRestaurant)
        })
        .then(function (response) {
            console.log("ok");
        })
        .catch(function (error) {
            console.log("error");
        });
}

export function updateRestaurant(userId, restaurantId, key, value) {
    var updateInfo = {
        userId: userId,
        restaurantId: restaurantId,
        key: key,
        value: value
    }

    fetch('/restaurants/' + restaurantId + '/edit', {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
            body: JSON.stringify(updateInfo)
        })
        .then(function (response) {
            console.log("ok");
        })
        .catch(function (error) {
            console.log("error");
        });
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
        .then(function (response) {
            console.log("ok");
        })
        .catch(function (error) {
            console.log("error");
        });
}

export async function findRestaurantsByType(foodType, n) {
    var restaurants = [{}]
    await fetch('/restaurants?key=foodType&value=' + foodType + 'n=' + n, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
        console.log("ok");
        return response.json()
    })
        .then(function (value) {
            console.log(value)
            restaurants = value;
        })
        .catch(function (error) {
            console.log("error");
        });
    return restaurants
}

export async function findRestaurantsByArea(location, diameter, n) {
    var restaurants = [{}]
    await fetch('/restaurants?key=location&value=' + location + 'diameter=' + diameter + 'n=' + n, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
        console.log("ok");
        return response.json()
    })
        .then(function (value) {
            console.log(value)
            restaurants = value;
        })
        .catch(function (error) {
            console.log("error");
        });
    return restaurants
}

export async function findRestaurantsByLowestRating(lowestRating, n) {
    var restaurants = [{}]
    await fetch('/restaurants?key=lowestRating&value=' + lowestRating + 'n=' + n, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
        console.log("ok");
        return response.json()
    })
        .then(function (value) {
            console.log(value)
            restaurants = value;
        })
        .catch(function (error) {
            console.log("error");
        });
    return restaurants
}

export async function findRestaurantReviews(restaurantId, n) {
    var reviews = [{}]
    await fetch('/restaurants/a/' + restaurantId + '/reviews', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
        console.log("ok");
        return response.json()
    })
        .then(function (value) {
            console.log(value)
            reviews = value;
        })
        .catch(function (error) {
            console.log("error");
        });
    return reviews
}

// TODO: return a promise, catch error in the called function
export async function findRestaurantById(restaurantId, n) {
    var restaurant = {}
    await fetch('/restaurants/a/' + restaurantId, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
        console.log("ok");
        return response.json()
    })
        .then(function (value) {
            console.log(value)
            restaurant = value;
        })
        .catch(function (error) {
            console.log("error");
        });
    return restaurant
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

export function saveRestaurant(userId, restaurantId) {
    return fetch('/restaurants/' + restaurantId + 'save/' + userId, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Content-Length': 0
        }
    })
}