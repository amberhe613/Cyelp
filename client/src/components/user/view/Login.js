import React from 'react';
import {checkLogin} from '../userService';

export default class Login extends React.Component {
    componentDidMount() {
        checkLogin().then((res) => {
            console.log(res)
            if (res._id !== null) {
                console.log("Login 9: already logged in")
                this
                    .props
                    .authenticateUser(res._id);
                this
                    .props
                    .history
                    .goBack();
            } else {
                console.log("Login 18: not logged in")
            }
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
