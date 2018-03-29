export function createRestaurant(userId, name, location, foodType) {
    var d = new Date();
    var newRestaurant = {
        id: '_' + Math.random().toString(36).substr(2, 9),
        name: name,
        location: location,
        foodType: foodType,
        userId: userId,
        addedDate: d.getDate(),
        rateTimes: 0,
        averageRating: 0,
        averagePrice: 0,
    }

    fetch('/restaurants/new', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newRestaurant)
    }).then(function (response) {
        console.log("ok");
    }).catch(function (error) {
        console.log("error");
    });
}

export function updateRestaurant(userId, restaurantId, key, value) {
    var updateInfo = {
        userId: userId,
        restaurantId: restaurantId,
        key: key,
        value: value,
    }

    fetch('/restaurants/' + restaurantId + '/edit', {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateInfo)
    }).then(function (response) {
        console.log("ok");
    }).catch(function (error) {
        console.log("error");
    });
}

export function reviewRestaurant(userId, restaurantId, rating, cost) {
    var rateInfo = {
        userId: userId,
        rating: rating,
        cost: cost,
    }

    fetch('/restaurants/' + restaurantId, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(rateInfo)
    }).then(function (response) {
        console.log("ok");
    }).catch(function (error) {
        console.log("error");
    });
}

export async function findRestaurantsByType(foodType, n) {
    var queryInfo = { key: 'foodType', value: foodType, n: n }
    var restaurants = [{}]
    await fetch('/restaurants/', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(queryInfo)
    }).then(function (response) {
        console.log("ok");
        return response.json()
    }).then(function (value) {
        console.log(value)
        restaurants = value;
    }).catch(function (error) {
        console.log("error");
    });
    return restaurants
}

export async function findRestaurantsByArea(location, diameter, n) {
    var queryInfo = { key: 'location', value: location, diameter: diameter, n: n }
    var restaurants = [{}]
    await fetch('/restaurants/', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(queryInfo)
    }).then(function (response) {
        console.log("ok");
        return response.json()
    }).then(function (value) {
        console.log(value)
        restaurants = value;
    }).catch(function (error) {
        console.log("error");
    });
    return restaurants
}

export async function findRestaurantsByLowestRating(lowestRating, n) {
    var queryInfo = { key: 'averageRating', value: lowestRating, n: n }
    var restaurants = [{}]
    await fetch('/restaurants/', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(queryInfo)
    }).then(function (response) {
        console.log("ok");
        return response.json()
    }).then(function (value) {
        console.log(value)
        restaurants = value;
    }).catch(function (error) {
        console.log("error");
    });
    return restaurants
}

export function sortRestaurantByRating(restaurants) {
    return restaurants.sort((a, b) => {
        if (a.averageRating != b.averageRating) {
            return a.averageRating - b.averageRating
        } else {
            if (a.averagePrice != b.averagePrice) {
                return a.averagePrice - b.averagePrice
            } else {
                return a.name - b.name
            }
        }
    })
}

export function sortRestaurantByPrice(restaurants) {
    return restaurants.sort((a, b) => {
        if (a.averagePrice != b.averagePrice) {
            return a.averagePrice - b.averagePrice
        } else {
            if (a.averageRating != b.averageRating) {
                return a.averageRating - b.averageRating
            } else {
                return a.name - b.name
            }
        }
    })
}