import React from 'react';
import {findReviewsByUserId} from '../reviewService';
import {checkLogin} from '../../user/userService';
import {ReviewTable} from '../../restaurant/view/restaurant';

export default class Reviews extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reviews: null,
            isAuthenticated: false,
            userId: null
        };
    }

    async componentDidMount() {
        await checkLogin().then((res) => {
            if (res._id !== null) {
                this.setState({isAuthenticated: true, userId: res._id})
            } else {}
        })
        findReviewsByUserId(queryBody).then((res) => {
            this.setState({reviews: res.reviews})
        })
    }

    render() {
        if (this.state.userId !== null) {
            return (<ReviewTable reviews={this.state.reviews}/>);
        } else {
            return (
                <div>
                    Please log in!
                </div>
            )

        }
    }
}
