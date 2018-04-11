import React from 'react';
import {checkLogin} from '../userService';

export default class Login extends React.Component {
    componentDidMount() {
        checkLogin().then((res) => {
            if (res._id !== null) {
                this
                    .props
                    .authenticateUser(res._id);
                this
                    .props
                    .history
                    .push('/');
            } else {}
        })
    }

    render() {
        return (
            <div>
                <button>
                    <a href="/auth/google">Google login</a>
                </button>
                <button>
                    <a href="/auth/github">Github login</a>
                </button>
            </div>
        )
    }
}
