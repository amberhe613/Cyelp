import React from 'react';
import StarRatingComponent from 'react-star-rating-component';
import {findRestaurant, sortRestaurantByReviewedNumber, sortRestaurantBySavedNumber, sortRestaurantByRating} from '../restaurantService';
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

class RestaurantRow extends React.Component {
    render() {
        const restaurant = this.props.restaurant;
        return (
            <tr>
                <td>
                    <a href={"/restaurants/" + restaurant._id}>{restaurant.name}</a>
                </td>
                <td>{restaurant.address.zipcode}</td>
                <td>{restaurant.cuisine}</td>
                <td>
                    <StarRatingComponent
                        name="rate"
                        starCount={5}
                        value={restaurant.averageRating}
                        editing={false}/>
                </td>

            </tr>
        );
    }
}

export class RestaurantTable extends React.Component {
    render() {
        const rows = [];
        this
            .props
            .restaurants
            .forEach((restaurant) => {
                rows.push(<RestaurantRow restaurant={restaurant} key={restaurant._id}/>);
            });

        return (
            <Table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Location</th>
                        <th>FoodType</th>
                        <th>AverageRating</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        );
    }
}

// TODO: handle input field change in local state
class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            foodType: '',
            area: '',
            lowestRating: ''
        };
        this.handleChange = this
            .handleChange
            .bind(this);

        this.handleFoodTypeChange = this
            .handleFoodTypeChange
            .bind(this);
        this.handleAreaChange = this
            .handleAreaChange
            .bind(this);
        this.handleLowestRatingChange = this
            .handleLowestRatingChange
            .bind(this);
    }

    handleFoodTypeChange(e) {
        e.preventDefault();
        this
            .props
            .onFoodTypeChange(this.state.foodType);
        this.setState({foodType: ''})
    }

    handleAreaChange(e) {
        // console.log("restaurantList 81")
        e.preventDefault();
        this
            .props
            .onAreaChange(this.state.area);
        this.setState({area: ''})
    }

    handleLowestRatingChange(e) {
        e.preventDefault();
        this
            .props
            .onLowestRatingChange(this.state.lowestRating);

        this.setState({lowestRating: ''})
    }

    handleChange(e) {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <form>
                <p>
                    Search restaurants by food type {' '}
                    {/* TODO: value and onChange locally */}
                    <Input
                        type="select"
                        name="foodType"
                        value={this.state.foodType}
                        onChange={this.handleChange}>
                        <option>Choose food type</option>
                        <option>Cantonese</option>
                        <option>Sichuan</option>
                        <option>Hunan</option>
                        <option>Fujian</option>
                        <option>Jiangsu</option>
                        <option>Zhejiang</option>
                        <option>Anhui</option>
                        <option>Shandong</option>
                    </Input>
                    <Button onClick={this.handleFoodTypeChange}>Search</Button>
                </p>
                <p>
                    Search restaurants by area {' '}
                    <Input
                        type="text"
                        name="area"
                        placeholder="five digit zip code"
                        value={this.state.area}
                        onChange={this.handleChange}/>
                    <Button onClick={this.handleAreaChange}>Search</Button>
                </p>
                <p>
                    Search restaurants by lowest rating {' '}
                    <Input
                        type="number"
                        min="1"
                        max="5"
                        name="lowestRating"
                        placeholder="lowest rating (1-5)"
                        value={this.state.lowestRating}
                        onChange={this.handleChange}/>
                    <Button onClick={this.handleLowestRatingChange}>Search</Button>
                </p>
            </form>
        );
    }
}

const jumbotronStyle = {
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundImage: `url('/images/jumbotronImg.jpg')`,
    backgroundPosition: "center",
    minHeight: "300px",
    textAlign: "center",
    boxShadow: "0px 2px 3px rgba(0,0,0,0.2), 0px 6px 8px rgba(0,0,0,0.1), 0px 10px 15px rgba(0,0" +
            ",0,0.1)"
};

const textStyle = {
    color: "white"
}

export class RestaurantList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            foodType: '',
            area: '',
            lowestRating: '',
            restaurants: []
        };

        this.handleFoodTypeChange = this
            .handleFoodTypeChange
            .bind(this);
        this.handleAreaChange = this
            .handleAreaChange
            .bind(this);
        this.handleLowestRatingChange = this
            .handleLowestRatingChange
            .bind(this);
        this.findAllRestaurants = this
            .findAllRestaurants
            .bind(this);
        this.sortBySavedNumber = this
            .sortBySavedNumber
            .bind(this);
        this.sortByReviewedNumber = this
            .sortByReviewedNumber
            .bind(this);
        this.sortByRating = this
            .sortByRating
            .bind(this);
    }

    async componentDidMount() {
        await checkLogin().then((res) => {
            if (res._id !== null) {
                this.setState({isAuthenticated: true, userId: res._id})
            } else {}
        })
        findRestaurant({}).then((res) => {
            this.setState({restaurants: res.restaurants})
        })
    }
    
    sortByReviewedNumber() {
        this.setState({
            restaurants: sortRestaurantByReviewedNumber(this.state.restaurants)
        })
    }

    sortBySavedNumber() {
        this.setState({
            restaurants: sortRestaurantBySavedNumber(this.state.restaurants)
        })
    }

    sortByRating() {
        this.setState({
            restaurants: sortRestaurantByRating(this.state.restaurants)
        })
    }

    findAllRestaurants() {
        findRestaurant({}).then((res) => {
            this.setState({restaurants: res.restaurants})
        })

    }

    handleAreaChange(area) {
        if (area === '') {
            return;
        }
        var queryBody = {
            "address.zipcode": area
        };
        findRestaurant(queryBody).then((res) => {
            this.setState({restaurants: res.restaurants})
        })
    };

    handleLowestRatingChange(lowestRating) {
        if (lowestRating === '') {
            return;
        }
        var queryBody = {
            averageRating: {
                $gte: lowestRating
            }
        };

        findRestaurant(queryBody).then((res) => {
            this.setState({restaurants: res.restaurants})
        })
    }

    handleFoodTypeChange(foodType) {
        if (foodType === '') {
            return;
        }
        var queryBody = {
            cuisine: foodType
        };

        findRestaurant(queryBody).then((res) => {
            this.setState({restaurants: res.restaurants})
        })
    }

    render() {
        return (
            <div>
                <Navbar color="light" light expand="xs">
                    <NavbarBrand href="/restaurants">Cyelp</NavbarBrand>
                    <Nav className="ml-auto" navbar>
                        {this.state.isAuthenticated
                            ? null
                            : <NavItem>
                                <NavLink href="/login">Login</NavLink>
                            </NavItem>}
                        <NavItem>
                            <NavLink href={"/user/" + this.state.userId}>Profile</NavLink>
                        </NavItem>
                    </Nav>
                </Navbar>
                <Jumbotron style={jumbotronStyle} fluid>
                    <Container fluid>
                        <h1 className="display-4" style={textStyle}>Welcome to Cyelp!</h1>
                        <Button onClick={this.findAllRestaurants}>See all restaurants</Button>
                        {/*<p className="lead" style={textStyle}>View our hand picked authentic Chinese restaurants!</p>*/}
                    </Container>
                </Jumbotron>
                <Container fluid>
                    <SearchBar
                        foodType={this.state.foodType}
                        area={this.state.area}
                        lowestRating={this.state.lowestRating}
                        onFoodTypeChange={this.handleFoodTypeChange}
                        onAreaChange={this.handleAreaChange}
                        onLowestRatingChange={this.handleLowestRatingChange}/>
                    <Button onClick={this.sortBySavedNumber}>Sort by saved times</Button>
                    <Button onClick={this.sortByReviewedNumber}>Sort by reviewed times</Button>
                    <Button onClick={this.sortByRating}>Sort by rating</Button>
                    <RestaurantTable restaurants={this.state.restaurants}/>
                </Container>
            </div>
        );
    }
}
