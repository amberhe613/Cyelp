import React from 'react';
import {findReviewsByUserId} from '../reviewService';
import {checkLogin} from '../../user/userService';

class UserReviewRow extends React.Component {
    render() {
        const review = this.props.review;

        return (
            <tr>
                <td>{review._restaurant.name}</td>
                <td>{review.content}</td>
                <td>{review.rating}</td>
                <td>{review.price}</td>
                <td>{review.createdAt}</td>
            </tr>
        );
    }
}

class UserReviewsTable extends React.Component {
    render() {
        const rows = [];
        this
            .props
            .reviews
            .forEach((review) => {
                rows.push(<UserReviewRow review={review} key={review._id}/>);
            });

        return (
            <table>
                <thead>
                    <tr>
                        <th>Restaurant name</th>
                        <th>Review content</th>
                        <th>Rating</th>
                        <th>Reported price</th>
                        <th>Review time</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
}

export default class Reviews extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reviews: null,
            username: null
        };
    }

    async componentDidMount() {
        findReviewsByUserId(this.props.match.params.userId).then((res) => {
            // TODO: set reviews
            console.log("reviews 17: reviews")
            console.log(res)
            this.setState({reviews: res.reviews, username: res.reviews[0]._author.name})
        })
    }

    render() {
        if (this.state.reviews !== null) {
            return (
                <div>
                    All reviews of {this.state.username}
                    <UserReviewsTable reviews={this.state.reviews}/>
                </div>
            );
        } else {
            return (
                <div>
                    No reviews for this user
                </div>
            )

        }
    }
}
