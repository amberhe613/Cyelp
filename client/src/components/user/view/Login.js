import React from 'react';
import {checkLogin} from '../userService';
import {Container} from 'reactstrap';

export default class Login extends React.Component {
    componentDidMount() {
        checkLogin().then((res) => {
            if (res._id !== null) {
               this
                    .props
                    .history
                    .push('/');
            } else {}
        })
    }

    render() {
        return (
            <Container fluid>
                <button>
                    <a href="/auth/google">Google login</a>
                </button>
                <button>
                    <a href="/auth/github">Github login</a>
                </button>
            </Container>
        )
    }
}
