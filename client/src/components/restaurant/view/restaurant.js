import React from 'react';
import {
    findRestaurantsReviews,
} from '../restaurantService';

// fix the number of review queries for now
const MAX_REVIEWS = 10;

class ReviewRow extends React.Component {
    render() {
        const review = this.props.review;

        return (
            <tr>
                <a herf={"/user/" + review.reviewer.id + "/reviews"}>
                    <td>{review.reviewer.name}</td>
                </a>
                <td>{review.content}</td>
            </tr>
        );
    }
}

class ReviewTable extends React.Component {
    render() {
        const rows = [];
        this.props.reviews.forEach((review) => {
            rows.push(
                <ReviewRow
                    review={review}
                    key={review.id}
                />
            );
        });

        return (
            <table>
                <thead>
                    <tr>
                        <th>Reviewr</th>
                        <th>Review</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
}

class RestaurantInfo extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <ul>
                    <li>Name: {this.props.restaurant.name}</li>
                    <li>Location: {this.props.restaurant.location}</li>
                    <li>Food Type: {this.props.restaurant.foodType}</li>
                    <li>Average Price: {this.props.restaurant.averagePrice}</li>
                    <li>Average Rating: {this.props.restaurant.averageRating}</li>
                </ul>
                <button onclick={this.props.onCreateReview}>Review me!</button>

            </div>
       );
    }
}


class Restaurant extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurantId: '',
            restaurantInfo: '',
            reviews: [{}],
        };
        this.createReview = this.createReview.bind(this)
    }

    createReview() {
        // use review service
        // jump to review create page
    }

    componentDidMount() {
        var restaurantId = this.props.params.restaurantId;
        var restaurantInfo = findRestaurantById(restaurantId, MAX_REVIEWS);
        var reviews = findRestaurantReviews(restaurantId, MAX_REVIEWS);
        this.setState({
            restaurantId: restaurantId,
            restaurantInfo: restaurantInfo,
            reviews: reviews
        })
    }

    render() {
        return (
            <div>
                <RestaurantInfo
                    restaurant={this.state.restaurant}
                />
                <ReviewTable
                    reviews={this.state.reviews}
                    onCreateReview={this.createReview}
                />
            </div>

        )
    }

}
