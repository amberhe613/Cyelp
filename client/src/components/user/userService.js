export function checkLogin() {
    return fetch('/api/account', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }).then((response) => response.json())
}

export function githubLogin() {
   return fetch('/githublogin', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }).then((response) => response.json())
}

export function googleLogin() {
   return fetch('/googlelogin', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
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


export function findCreatedRestaurants(userId) {
    return fetch('/api/user/'+userId+'/createdrestaurants', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then((response) => response.json())
}

export function findSavedRestaurants(userId) {
    return fetch('/user/'+userId+'/savedrestaurants', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then((response) => response.json())
}

export function findReviewedRestaurants(userId, N) {
    return fetch('/user/'+userId+'/reviewedrestaurants', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then((response) => response.json())
}
