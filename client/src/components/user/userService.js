export async function login(username, password) {
    var loginInfo = {
        username: username,
        password: password,
   }
    return fetch('/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginInfo)
    }).then((response) => response.json())
}

export function findUserById(userId) {
    return fetch('/user/'+userId, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then((response) => response.json())
}


export function findCreatedRestaurants(userId, N) {
    return fetch('/user/'+userId+'/createdRestaurants', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then((response) => response.json())
}

export function findSavedRestaurants(userId, N) {
    return fetch('/user/'+userId+'/savedRestaurants', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then((response) => response.json())
}

export function findReviewedRestaurants(userId, N) {
    return fetch('/user/'+userId+'/reviewedRestaurants', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then((response) => response.json())
}
