import React from 'react';
import StarRatingComponent from 'react-star-rating-component';
import {
    ignoreRestaurant,
    markRestaurant,
    findRestaurant,
    sortRestaurantByReviewedNumber,
    sortRestaurantBySavedNumber,
    sortRestaurantByRating,
    deleteRestaurant
} from '../restaurantService';
import {checkLogin, logout} from '../../user/userService';
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
    Table,
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';

class RestaurantRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurant: this.props.restaurant
        }
        this.onFireDeletion = this
            .onFireDeletion
            .bind(this);
        this.onFireUpdate = this
            .onFireUpdate
            .bind(this);
        this.onDelete = this
            .onDelete
            .bind(this);
        this.onIgnore = this
            .onIgnore
            .bind(this);
    }

    onFireDeletion() {
        markRestaurant(this.state.restaurant._id, {deleteRequested: true}).then((res) => {
            console.log("mark deletion success")
        }).catch((err) => {})
    }

    onFireUpdate(id) {
        markRestaurant(this.state.restaurant._id, {updateRequested: true}).then((res) => {
            console.log("mark update success")
        }).catch((err) => {})
    }

    onDelete(id) {
        deleteRestaurant(this.state.restaurant._id).then((res) => {
            window
                .location
                .reload();
            console.log("delete update success")
        }).catch((err) => {})
    }

    onIgnore(id) {
        ignoreRestaurant(this.state.restaurant._id).then((res) => {
            window
                .location
                .reload();
            console.log("ignore update success")
        }).catch((err) => {})
    }

    render() {
        if (this.props.isFireDelete) {
            return (
                <tr>
                    <td>
                        <a href={"/restaurants/" + this.state.restaurant._id}>{this.state.restaurant.name}
                        </a>
                        {this.state.restaurant.image === null
                            ? <img src={"/images/imgIcon.png"} alt="imgicon" height="15" width="15"/>
                            : <img
                                src={"/productImg/" + this.state.restaurant.image}
                                alt="restaurantimagej"
                                height="15"
                                width="15"/>}

                    </td>
                    <td>{this.state.restaurant.address.zipcode}</td>
                    <td>{this.state.restaurant.cuisine}</td>
                    <td>
                        <StarRatingComponent
                            name="rate"
                            starCount={5}
                            value={this.state.restaurant.averageRating}
                            editing={false}/>
                    </td>
                    <td>
                        <Button onClick={this.onFireDeletion}>Fire deletion</Button>
                    </td>
                    {/* <td>
                        <Button onClick={this.onFireUpdate}>Fire Update</Button>
                    </td> */}
                </tr>
            );
        } else if (this.props.isAdmin) {
            return (
                <tr>
                    <td>
                        <a href={"/restaurants/" + this.state.restaurant._id}>{this.state.restaurant.name}</a>
                        {this.state.restaurant.image === null
                            ? <img src={"/images/imgIcon.png"} alt="imgicon" height="15" width="15"/>
                            : <img
                                src={"/productImg/" + this.state.restaurant.image}
                                alt="restaurantimagej"
                                height="15"
                                width="15"/>}
                    </td>
                    <td>{this.state.restaurant.address.zipcode}</td>
                    <td>{this.state.restaurant.cuisine}</td>
                    <td>
                        <StarRatingComponent
                            name="rate"
                            starCount={5}
                            value={this.state.restaurant.averageRating}
                            editing={false}/>
                    </td>
                    <td>
                        <Button onClick={this.onDelete}>Delete</Button>
                    </td>
                    <td>
                        <Button onClick={this.onIgnore}>Ignore</Button>
                    </td>
                </tr>
            );
        } else {
            return (
                <tr>
                    <td>
                        <a href={"/restaurants/" + this.state.restaurant._id}>{this.state.restaurant.name}</a>
                        {this.state.restaurant.image === null
                            ? <img src={"/images/imgIcon.png"} alt="imgicon" height="15" width="15"/>
                            : <img
                                src={"/productImg/" + this.state.restaurant.image}
                                alt="restaurantimagej"
                                height="15"
                                width="15"/>}
                    </td>
                    <td>{this.state.restaurant.address.zipcode}</td>
                    <td>{this.state.restaurant.cuisine}</td>
                    <td>
                        <StarRatingComponent
                            name="rate"
                            starCount={5}
                            value={this.state.restaurant.averageRating}
                            editing={false}/>
                    </td>
                </tr>
            );
        }
    }
}

export class RestaurantTable extends React.Component {
    render() {
        const rows = [];
        this
            .props
            .restaurants
            .forEach((restaurant) => {
                rows.push(<RestaurantRow
                    isAdmin={this.props.isAdmin}
                    isFireDelete={this.props.isFireDelete}
                    restaurant={restaurant}
                    key={restaurant._id}/>);
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
            restaurants: [],
            dropdownOpen: false,
            display: "options"
        };
        this.toggle = this
            .toggle
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
            if (res && res._id !== null) {
                this.setState({isAuthenticated: true, userId: res._id})
            } else {}
        })
        findRestaurant({}).then((res) => {
            if (res) {
                this.setState({restaurants: res.restaurants})
            }
        })
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    sortByReviewedNumber() {
        this.setState({
            restaurants: sortRestaurantByReviewedNumber(this.state.restaurants),
            display: "reviewed times"
        })
    }

    sortBySavedNumber() {
        this.setState({
            restaurants: sortRestaurantBySavedNumber(this.state.restaurants),
            display: "saved times"
        })
    }

    sortByRating() {
        this.setState({
            restaurants: sortRestaurantByRating(this.state.restaurants),
            display: "rating"
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
                            ? <NavLink
                                    onClick={(e) => {
                                    e.preventDefault();
                                    logout().then(() => {
                                        window
                                            .location
                                            .reload();
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
                <Jumbotron style={jumbotronStyle} fluid>
                    <Container fluid>
                        <h1 className="display-4" style={textStyle}>Welcome to
                            <img src={"/images/logoImg.png"} alt="logo" height="70" width="70"/>
                            Cyelp!</h1>
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
                    <span>Sort By { }
                    </span>
                    <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                        <DropdownToggle caret>
                            {this.state.display}
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem onClick={this.sortBySavedNumber}>saved times</DropdownItem>
                            <DropdownItem onClick={this.sortByReviewedNumber}>reviewed times</DropdownItem>
                            <DropdownItem onClick={this.sortByRating}>rating</DropdownItem>
                        </DropdownMenu>
                    </ButtonDropdown>
                    <RestaurantTable restaurants={this.state.restaurants}/>
                </Container>
            </div>
        );
    }
}
