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

export function likeRestaurant(userId, restaurantId) {
    var rateInfo = {
        userId: userId,
        like: true,
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

export function dislikeRestaurant(userId, restaurantId) {
    var rateInfo = {
        userId: userId,
        like: falst,
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

