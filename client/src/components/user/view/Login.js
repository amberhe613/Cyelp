import React from 'react';
import {login} from '../userService';

export default class Login extends React.Component {
    // need a props for userId
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);

    }

    handleUsernameChange(username) {
        this.setState({
            username: username
        })
    }

    handlePasswordChange(password) {
        this.setState({
            password: password
        })
    }

    handleLogin() {
        var isLoginSuccess = login(this.username, this.password);
        if (isLoginSuccess) {
            this.props.onSuccessLogin(this.username)
        }
    }

    render() {
        return (
            <form>
                <p>
                    User Name
                    {' '}
                    <input
                        type="text"
                        placeholder=""
                        value={this.state.username}
                        onChange={this.handleUsernameChange}
                    />
                </p>
                <p>
                    Password
                    {' '}
                    <input
                        type="text"
                        placeholder=""
                        value={this.state.password}
                        onChange={this.handlePasswordChange}
                    />
                </p>
                <button onclick="handleLogin()">Login</button>
            </form>
        )
    }
}


// Facebook SDK for Javascript For reference
// <script>
// window.fbAsyncInit = function() {
//     FB.init({
//         appId      : '{your-app-id}',
//         cookie     : true,
//         xfbml      : true,
//         version    : '{latest-api-version}'
//     });
//
//     FB.AppEvents.logPageView();
//
// };
//
// (function(d, s, id){
//     var js, fjs = d.getElementsByTagName(s)[0];
//     if (d.getElementById(id)) {return;}
//     js = d.createElement(s); js.id = id;
//     js.src = "https://connect.facebook.net/en_US/sdk.js";
//     fjs.parentNode.insertBefore(js, fjs);
// }(document, 'script', 'facebook-jssdk'));
// </script>