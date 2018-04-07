import React from 'react';
import {findRestaurantById, findRestaurantReviews, saveRestaurant} from '../restaurantService';
import NewReview from './components/review/view/newReview';

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
        this
            .props
            .reviews
            .forEach((review) => {
                rows.push(<ReviewRow review={review} key={review.id}/>);
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
                <button onclick={this.props.reviewRestaurant}>Review me!</button>
                <button onclick={this.props.saveRestaurant}>Save me!</button>

            </div>
        );
    }
}

export default class Restaurant extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurantInfo: '',
            reviews: [{}],
            renderNewRevie: false,
        };
        this.saveRestaurant = this.saveRestaurant.bind(this);
        this.reviewRestaurant = this.reviewRestaurant.bind(this);
    }

    componentDidMount() {
        var restaurantId = this.props.params.restaurantId;
        var restaurantInfo = findRestaurantById(restaurantId, MAX_REVIEWS);
        var reviews = findRestaurantReviews(restaurantId, MAX_REVIEWS);
        this.setState({restaurantId: restaurantId, restaurantInfo: restaurantInfo, reviews: reviews})
    }

    saveRestaurant() {
        if (this.props.userId !== '') {
            saveRestaurant(this.props.userId, this.state.restaurantId).catch((err) => {
                // TODO: alert if save not success
                console.log("save restaurant not success")
            })
        } else {
            this.props.history.push('/login');
        }
    }

    reviewRestaurant() {
        if (this.props.userId !== '') {
            this.setState({renderNewReview: true})
        } else {
            // TODO: alert user login first
            this.props.history.push('/login');
        }
    }

    render() {
        return (
            <div>
                <RestaurantInfo
                    restaurant={this.state.restaurant}
                    reviewRestaurant={this.reviewRestaurant}
                    saveRestaurant={this.saveRestaurant}/>
                <ReviewTable reviews={this.state.reviews}/>
                {this.state.renderNewReview ? <NewReview restaurantInfo={this.state.restaurantInfo} userId={this.props.userId} /> : null}
            </div>
        )
    }
}
