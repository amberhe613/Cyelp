export function githubLogin(){
    console.log("hi from user service github login")
    return fetch('/auth/github', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: "same-origin",
        mode: "no-cors"
    })
}
export function googleLogin(){
    console.log("hi from user service google login")
    return fetch('/auth/google', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: "same-origin",
        mode: "no-cors"
    })
}

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
    }).catch((err)=>{
        console.log(err)
    })
}

export function checkAdmin() {
    return fetch('/api/admin', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: "same-origin",
    }).then((res) => {
        return res.json()
    }).catch((err)=>{
        console.log(err)
    })
}

export function findUserById(userId) {
    // console.log("userservice 15")
    return fetch('/api/user/' + userId, {
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
    return fetch('/api/user/' + userId + '/savedrestaurants', {
        method: 'GET',
        credentials: "same-origin",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then((res) => res.json())
}

export function findReviewedRestaurants(userId, N) {
    return fetch('/api/user/' + userId + '/reviewedrestaurants', {
        method: 'GET',
        credentials: "same-origin",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then((res) => res.json())
}

export function logout(){
    console.log("user service 60")
    return fetch('/api/logout', {
        method: 'GET',
        credentials: "same-origin",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
}