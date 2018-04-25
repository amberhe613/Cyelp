import React from 'react';
import {checkLogin, googleLogin, githubLogin} from '../userService';
import {Container} from 'reactstrap';
import {GoogleLoginButton} from 'react-social-login-buttons';
import {GithubLoginButton} from 'react-social-login-buttons';

const buttonStyle = {
    background:"grey"
};

const buttonSyleActive = {
    background:"#959ba5"
}

const headerStyle = {
    textAlign: "center"
}


export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.onGoogleLogin = this
            .onGoogleLogin
            .bind(this);
        this.onGithubLogin = this
            .onGithubLogin
            .bind(this);
    }


    componentDidMount() {
        checkLogin().then((res) => {
            if (res && res._id !== null) {
                console.log(this.props.history)
                this
                    .props
                    .history
                    .goBack();
            } else {}
        })
    }

    onGoogleLogin(e) {
        e.preventDefault();
        googleLogin().then(() => {
            window
                .location
                .reload();
        })
    }

    onGithubLogin(e) {
        e.preventDefault();
        githubLogin().then(() => {
            window
                .location
                .reload();
        })
    }


    render() {
        return (
            <Container>
                <h2 style={headerStyle}>Login </h2>
                <hr/>
                <GoogleLoginButton style={buttonStyle} activeStyle={buttonSyleActive} onClick={this.onGoogleLogin}/>
                <GithubLoginButton sonClick={this.onGithubLogin}/>
            </Container>
        )
    }
}
