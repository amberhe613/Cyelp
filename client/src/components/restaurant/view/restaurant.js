import React from 'react';
import {findRestaurantById, findRestaurantReviews, saveRestaurant} from '../restaurantService';
import NewReview from '../../review/view/newReview'

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
                    <li>Location: {this.props.restaurant.address.zipcode}</li>
                    <li>Food Type: {this.props.restaurant.cuisine}</li>
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
            restaurant: '',
            reviews: [
                {}
            ],
            renderNewReview: false
        };
        this.saveRestaurant = this
            .saveRestaurant
            .bind(this);
        this.reviewRestaurant = this
            .reviewRestaurant
            .bind(this);
    }

    componentDidMount() {
        var restaurantId = this.props.params.restaurantId;
        findRestaurantById(restaurantId).then((res) => {
            this.setState({restaurant: res.restaurant})
        })
        findRestaurantReviews(restaurantId).then((res) => {
            this.setState({reviews: res.reviews})
        })
    }

    saveRestaurant() {
        if (this.props.userId !== '') {
            saveRestaurant(this.state.restaurantId).catch((err) => {
                // TODO: alert if save not success
                console.log("save restaurant not success")
            })
        } else {
            this
                .props
                .history
                .push('/login');
        }
    }

    reviewRestaurant() {
        if (this.props.userId !== '') {
            this.setState({renderNewReview: true})
        } else {
            // TODO: alert user login first
            this
                .props
                .history
                .push('/login');
        }
    }

    render() {
        return (
            <div>
                Hi from Restaurant
                <a herf="/restaurants">go back to restaurants</a>
                <RestaurantInfo
                    restaurant={this.state.restaurant}
                    reviewRestaurant={this.reviewRestaurant}
                    saveRestaurant={this.saveRestaurant}/>
                <ReviewTable reviews={this.state.reviews}/> {this.state.renderNewReview
                    ? <NewReview restaurant={this.state.restaurant} userId={this.props.userId}/>
                    : null}
            </div>
        )
    }
}
