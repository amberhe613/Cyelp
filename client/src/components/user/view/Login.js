import React from 'react';
import {Link} from 'react-router-dom';
import {checkLogin, googleLogin, githubLogin} from '../userService';
import {Container} from 'reactstrap';

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
                // this     .props     .history     .push('/restaurants');
                this
                    .props
                    .history
                    .goBack();
            } else {}
        })
    }

    onGoogleLogin(e) {
        e.preventDefault();
        googleLogin().then(()=>{
            this.props.history.goBack();
        });
    }

    onGithubLogin(e) {
        e.preventDefault();
        githubLogin().then(()=>{
            this.props.history.goBack();
        });
    }

    render() {
        return (
            <Container fluid>
                <button onClick={this.onGoogleLogin}>
                    Google login
                </button>
                <button onClick={this.onGithubLogin}>
                    Github login
                </button>
           </Container>
        )
    }
}
