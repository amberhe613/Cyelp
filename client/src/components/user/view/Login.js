import React from 'react';
import {
    login,
} from '../userService';


export default class NewRestaurant extends React.Component {
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

    handleUsernameChange(area) {
        this.setState({
            username: username
        })
    }

    handlePasswordChange(area) {
        this.setState({
            password: password
        })
    }

    handleLogin() {
        var isLoginSuccess = login(this.username, this.password);
        if (isLoginSuccess) {
            this.props.handleLogin(userId)
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
