import React from 'react';
import {findReviewsByUserId} from '../reviewService';
import {checkLogin} from '../../user/userService';
import {ReviewTable} from '../../restaurant/view/restaurant';

export default class Reviews extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reviews: null
        };
    }

    async componentDidMount() {
        findReviewsByUserId().then((res) => {
            // TODO: set reviews
            // this.setState({reviews: res.reviews})
        })
    }

    render() {
        if (this.state.reviews !== null) {
            return (<ReviewTable reviews={this.state.reviews}/>);
        } else {
            return (
                <div>
                    No reviews for this user
                </div>
            )

        }
    }
}
