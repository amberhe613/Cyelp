import React from 'react';
import {findReviewsByUserId} from '../reviewService';
import {checkLogin} from '../../user/userService';
import {Navbar, NavbarBrand, NavItem, NavLink, Nav, Jumbotron, Container, Input, Button, Table } from 'reactstrap';
import StarRatingComponent from 'react-star-rating-component';

class UserReviewRow extends React.Component {
    render() {
        const review = this.props.review;

        return (
            <tr>
                <td>{review._restaurant.name}</td>
                <td>{review.content}</td>
                <td>
                    <StarRatingComponent
                        name="rate"
                        starCount={5}
                        value={review.rating}
                    />
                </td>
                <td>{review.price}</td>
                <td>{review.createdAt}</td>
                {this.props.showModify
                    ? <button>Modify</button>
                    : null}
                 {this.props.showDelete
                    ? <button>Delete</button>
                    : null}
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
                // TODO: props show modify
                rows.push(<UserReviewRow review={review} key={review._id}/>);
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
                <Container fluid>
                    <div>
                        <h3>All reviews of {this.state.username}</h3>
                        <UserReviewsTable reviews={this.state.reviews}/>
                    </div>
                </Container>
            );
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
