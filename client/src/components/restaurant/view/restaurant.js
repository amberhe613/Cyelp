import React from 'react';
import {findRestaurantById, findRestaurantReviews, saveRestaurant} from '../restaurantService';
import NewReview from '../../review/view/newReview'

class ReviewRow extends React.Component {
    render() {
        const review = this.props.review;
 
        return (
            <tr>
                <td>
                    <a href={"/user/"+review._author.id+"/reviews"}>{review._author.name}</a>
                </td>

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
                rows.push(<ReviewRow review={review} key={review._id}/>);
            });

        return (
            <table>
                <thead>
                    <tr>
                        <th>Reviewer</th>
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
                <button onClick={this.props.reviewRestaurant}>Review me!</button>
                <button onClick={this.props.saveRestaurant}>Save me!</button>

            </div>
        );
    }
}

export default class Restaurant extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurant: null,
            reviews: null,
            renderNewReview: false
        };
        this.saveRestaurant = this
            .saveRestaurant
            .bind(this);
        this.reviewRestaurant = this
            .reviewRestaurant
            .bind(this);
    }

    componentWillMount() {
        var restaurantId = this.props.match.params.restaurantId;
        findRestaurantById(restaurantId).then((res) => {
            this.setState({restaurant: res.restaurant})
        })
        findRestaurantReviews(restaurantId).then((res) => {
            console.log(res)
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
        if (this.props.userId !== null) {
            console.log("restaurant 104 render review")
            this.setState({renderNewReview: true})
        } else {
            console.log("restaurant 106 direct to login")
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
                <button>
                    <a href="/restaurants">Go back to restaurants</a>
                </button>
                {this.state.restaurant !== null
                    ? <RestaurantInfo
                            restaurant={this.state.restaurant}
                            reviewRestaurant={this.reviewRestaurant}
                            saveRestaurant={this.saveRestaurant}/>
                    : null}
                {this.state.reviews !== null
                    ? <ReviewTable reviews={this.state.reviews}/>
                    : null}
                {this.state.renderNewReview === true
                    ? <NewReview restaurant={this.state.restaurant} userId={this.props.userId}/>
                    : null
}
            </div>
        )
    }
}
