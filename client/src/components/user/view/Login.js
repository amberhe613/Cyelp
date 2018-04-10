import React from 'react';
import {googleLogin, githubLogin} from '../userService';

export default class Login extends React.Component {
    // need a props for userId
    constructor(props) {
        super(props);
        this.handleGoogleLogin = this
            .handleGoogleLogin
            .bind(this);
        this.handleGithubLogin = this
            .handleGithubLogin
            .bind(this);
    }

    handleGoogleLogin(event) {
        event.preventDefault();
        googleLogin().then((res) => {
            if (res._id !== null) {
                this
                    .props
                    .authenticateUser(res._id);
                this
                    .props
                    .history
                    .goBack();
            } else {
                // TODO: now do nothing, may render alert later
                console.log("login failure")
            }
        })
    }

    handleGithubLogin(event) {
        event.preventDefault();
        githubLogin().then((res) => {
            if (res.userId !== null) {
                this
                    .props
                    .authenticateUser(res.userId);
                this
                    .props
                    .history
                    .goBack();
            } else {
                // TODO: now do nothing, may render alert later
                console.log("login failure")
            }
        })
    }

    render() {
        return (
            <div>
                Hi from Login
                <button onclick={this.handleGoogleLogin}>Login using Google account</button>
                <button onclick={this.handleGithubLogin}>Login using Github account</button>
            </div>
        )
    }
}
