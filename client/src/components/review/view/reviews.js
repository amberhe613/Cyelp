import React from 'react';
import {findReviewsByUserId, updateReview, deleteReview} from '../reviewService';
import {checkLogin} from '../../user/userService';
import {
    Navbar,
    NavbarBrand,
    NavItem,
    NavLink,
    Nav,
    Jumbotron,
    Container,
    Input,
    Button,
    Table
} from 'reactstrap';
import StarRatingComponent from 'react-star-rating-component';

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

    async handleSubmit() {
        console.log(this.props.review)
        await updateReview(this.props.review._id, this.state).then((res) => {
            console.log("update review success")
       }).catch((err) => {
            console.log("reviews 35" + err)
        })
    }

    handleDelete() {
        deleteReview(this.props.review._id).then((res) => {
            console.log("delete review success")
       }).catch((err) => {
            console.log("delete reviews failure")
        })
    }

    render() {
        const review = this.props.review;

        if (this.props.showModify) {
            return (
                <tr>
                    <td>
                        <a href={"/restaurants/" + review._restaurant.id}>
                            {review._restaurant.name}
                        </a>
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
                    <td>
                        <button onClick={this.handleSubmit}>Update</button>
                    </td>
                    <td>
                        <button onClick={this.handleDelete}>Delete</button>
                    </td>

                </tr>
            )
        } else {
            return (
                <tr>
                    <td>
                        <a href={"/restaurants/" + review._restaurant.id}>
                            {review._restaurant.name}
                        </a>
                    </td>
                    <td>{review.content}</td>
                    <td>
                        <StarRatingComponent name="rate" starCount={5} value={review.rating}/>
                    </td>
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
            <Table>
                <thead>
                    <tr>
                        <th>Restaurant name</th>
                        <th>Review</th>
                        <th>Rating</th>
                        <th>Reported price</th>
                        <th>Review time</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
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
            if (res.reviews.length !== 0) {
                this.setState({reviews: res.reviews, username: res.reviews[0]._author.name})
            }
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
                <Container fluid>
                    <div>
                        <h3>All reviews of {this.state.username}</h3>
                        <UserReviewsTable
                            showModify={this.state.showModify}
                            reviews={this.state.reviews}/>
                    </div>
                </Container>
            )
        } else {
            return (
                <div>
                    <h3>
                        No reviews for this user
                    </h3>

                </div>
            )

        }
    }
}
