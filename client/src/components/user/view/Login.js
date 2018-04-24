import React from 'react';
import {checkLogin} from '../userService';
import {Container} from 'reactstrap';

export default class Login extends React.Component {
    componentDidMount() {
        checkLogin().then((res) => {
            if (res._id !== null) {
                console.log(this.props.history)
                // this
                //     .props
                //     .history
                //     .push('/restaurants');
                this
                    .props
                    .history
                    .goBack();
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
