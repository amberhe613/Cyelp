export function checkLogin() {
    return fetch('/api/account', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: "same-origin",
    }).then((res) => {
        return res.json()
    })
}

export function findUserById(userId) {
    return fetch('/user/' + userId, {
        method: 'GET',
        credentials: "same-origin",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then((res) => res.json())
}

export function findCreatedRestaurants(userId) {
    return fetch('/api/user/' + userId + '/createdrestaurants', {
        method: 'GET',
        credentials: "same-origin",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then((res) => res.json())
}

export function findSavedRestaurants(userId) {
    return fetch('/user/' + userId + '/savedrestaurants', {
        method: 'GET',
        credentials: "same-origin",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then((res) => res.json())
}

export function findReviewedRestaurants(userId, N) {
    return fetch('/user/' + userId + '/reviewedrestaurants', {
        method: 'GET',
        credentials: "same-origin",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then((res) => res.json())
}
