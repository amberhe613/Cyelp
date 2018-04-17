import React from 'react';
import {checkLogin, logout} from '../../user/userService'
import {findRestaurantById, findRestaurantReviews, saveRestaurant} from '../restaurantService';
import NewReview from '../../review/view/newReview'
import {
    Navbar,
    NavbarBrand,
    NavItem,
    NavLink,
    Nav,
    Container,
    Input,
    Button,
    Table,
    Card,
    CardTitle,
    CardText,
    CardBody,
    CardImg
} from 'reactstrap'
import StarRatingComponent from 'react-star-rating-component';

class ReviewRow extends React.Component {
    render() {
        const review = this.props.review;

        return (
            <tr>
                <td>
                    <a href={"/user/" + review._author.id + "/reviews"}>{review._author.name}</a>
                </td>
                <td>{review.content}</td>
                <td>
                    <StarRatingComponent name="rate" starCount={5} value={review.rating}/>
                </td>
                <td>{review.price}</td>
                <td>{review.createdAt}</td>
            </tr>
        );
    }
}

export class ReviewTable extends React.Component {
    render() {
        const rows = [];
        this
            .props
            .reviews
            .forEach((review) => {
                rows.push(<ReviewRow review={review} key={review._id}/>);
            });

        return (
            <Table>
                <thead>
                    <tr>
                        <th>Reviewer</th>
                        <th>Content</th>
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

class RestaurantInfo extends React.Component {
    render() {
        return (
            <div>
                <Container fluid>
                    <Card>
                        {this.props.restaurant.image === null
                            ? null
                            : <CardImg
                                top
                                width="100%"
                                src={"/productImg/" + this.props.restaurant.image}
                                alt="restaurant image"/>
}
                        <CardBody>
                            <CardTitle>{this.props.restaurant.name}</CardTitle>
                            <CardText>
                                <div>Description: {this.props.restaurant.description}</div>
                                <StarRatingComponent
                                    name="rate"
                                    starCount={5}
                                    value={this.props.restaurant.averageRating}
                                    editing={false}/>
                                <div>Location: {this.props.restaurant.address.zipcode}</div>
                                <div>Food Type: {this.props.restaurant.cuisine}</div>

                            </CardText>
                            <Button onClick={this.props.reviewRestaurant}>Review me!</Button>
                            <Button onClick={this.props.saveRestaurant}>Save me!</Button>
                        </CardBody>
                    </Card>
                </Container>
            </div>
        );
    }
}

export class Restaurant extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurant: null,
            reviews: null,
            renderNewReview: false,
            isAuthenticated: false,
            userId: null
        };
        this.saveRestaurant = this
            .saveRestaurant
            .bind(this);
        this.reviewRestaurant = this
            .reviewRestaurant
            .bind(this);
        this.logout = this
            .logout
            .bind(this);
    }

    async componentWillMount() {
        await checkLogin().then((res) => {
            if (res._id !== null) {
                this.setState({isAuthenticated: true, userId: res._id})
            } else {}
        })

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
        if (this.state.userId !== null) {
            saveRestaurant(this.state.restaurant._id).then(res => {
                console.log("save success")
            }).catch((err) => {
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
        if (this.state.userId !== null) {
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

    logout(e) {
        console.log("restaurant 158: hit logout ")
        e.preventDefault();
        logout();
    }

    render() {
        return (
            <div>
                <Navbar color="light" light expand="xs">
                    <NavbarBrand href="/restaurants">Cyelp</NavbarBrand>
                    <Nav className="ml-auto" navbar>
                        {this.state.isAuthenticated
                            ? <NavLink
                                    onClick={(e) => {
                                    e.preventDefault();
                                    logout().then(()=>{
                                        window.location.reload();
                                    })
                                }}>Logout</NavLink>
                            : <NavItem>
                                <NavLink href="/login">Login</NavLink>
                            </NavItem>}
                        <NavItem>
                            <NavLink href={"/user/" + this.state.userId}>Profile</NavLink>
                        </NavItem>
                    </Nav>
                </Navbar>
                <Container fluid>
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
                        ? <NewReview restaurant={this.state.restaurant}/>
                        : null}
                </Container>
            </div>
        )
    }
}
