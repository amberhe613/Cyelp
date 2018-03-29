export async function login(username, password) {
    var loginInfoj = {
        username: username,
        password: password,
   }

    var isLoginSuccess = false;
    await fetch('/restaurants/new', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginInf0)
    }).then(function (response) {
        isLoginSuccess = true;
        console.log("ok");
    }).catch(function (error) {
        console.log("error");
    });

    return isLoginSuccess;
}

