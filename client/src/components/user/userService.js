export async function login(username, password) {
    var loginInfo = {
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
        body: JSON.stringify(loginInfo)
    }).then(function (response) {
        isLoginSuccess = true;
        console.log("ok");
    }).catch(function (error) {
        console.log("error");
    });

    return isLoginSuccess;
}

