import React from 'react';
import {findReviewsByUserId, updateReview, deleteReview} from '../reviewService';
import {checkLogin} from '../../user/userService';

class UserReviewRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.review;
        this.handleChange = this
            .handleChange
            .bind(this);
        this.handleSubmit = this
            .handleSubmit
            .bind(this);
        this.handleDelete = this
            .handleDelete
            .bind(this);
    }

    handleChange(e) {
        e.preventDefault()
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit() {
        updateReview(this.props.review._id, this.state).then((res) => {
            console.log("update review success")
        }).catch((err) => {
            console.log("reviews 35" + err)
        })
    }

    handleDelete() {
        deleteReview(this.props.review._id).then((res) => {
            console.log("delete review success")
        }).catch((err) => {
            console.log("reviews 42" + err)
        })

    }

    render() {
        const review = this.props.review;

        if (this.props.showModify) {
            return (
                <tr>
                    <td>
                        {review._restaurant.name}
                    </td>
                    <td>
                        <input
                            type="text"
                            name="content"
                            value={this.state.content}
                            onChange={this.handleChange}
                            placeholder={review.content}/>
                    </td>
                    <td>
                        <input
                            type="text"
                            name="rating"
                            value={this.state.rating}
                            onChange={this.handleChange}
                            placeholder={review.rating}/>
                    </td>
                    <td>
                        <input
                            type="text"
                            name="price"
                            value={this.state.price}
                            onChange={this.handleChange}
                            placeholder={review.price}/>
                    </td>
                    <td>{review.createdAt}</td>
                    <button onClick={this.handleSubmit}>Update</button>
                    <button onClick={this.handleDelete}>Delete</button>
                </tr>
            )
        } else {
            return (
                <tr>
                    <td>{review._restaurant.name}</td>
                    <td>{review.content}</td>
                    <td>{review.rating}</td>
                    <td>{review.price}</td>
                    <td>{review.createdAt}</td>
                </tr>
            )
        }
    }
}

class UserReviewsTable extends React.Component {
    render() {
        const rows = [];
        this
            .props
            .reviews
            .forEach((review) => {
                // TODO: props show modify
                rows.push(<UserReviewRow
                    review={review}
                    key={review._id}
                    showModify={this.props.showModify}/>);
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
            username: null,
            showModify: false
        };
    }

    async componentDidMount() {
        findReviewsByUserId(this.props.match.params.userId).then((res) => {
            // TODO: set reviews console.log("reviews 17: reviews") console.log(res)
            this.setState({reviews: res.reviews, username: res.reviews[0]._author.name})
        })

        await checkLogin().then((res) => {
            if (res._id !== null) {
                if (res._id === this.props.match.params.userId) {
                    this.setState({showModify: true})
                }
            }
        })
    }

    render() {
        if (this.state.reviews !== null) {
            return (
                <div>
                    All reviews of {this.state.username}
                    <UserReviewsTable
                        showModify={this.state.showModify}
                        reviews={this.state.reviews}/>
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
