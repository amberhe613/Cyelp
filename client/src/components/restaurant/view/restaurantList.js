import React from 'react';
import {findRestaurant} from '../restaurantService';

class RestaurantRow extends React.Component {
    render() {
        const restaurant = this.props.restaurant;

        return (
            <tr>
                <td>
                    {restaurant.name}
                </td>
                <td>{restaurant.address.zipcode}</td>
                <td>{restaurant.cuisine}</td>
                <td>{restaurant.averageRating}</td>
                {/* TODO: link to react table */}
                {/* <a herf={"/restaurants/" + restaurant._id}>
                    go
                </a> */}
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
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Location</th>
                        <th>foodType</th>
                        <th>averageRating</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
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
        console.log("restaurantList 81")
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
                    <input
                        type="text"
                        name="foodType"
                        placeholder="food type (sichuan, hunan...)"
                        value={this.state.foodType}
                        onChange={this.handleChange}/>
                    <button onClick={this.handleFoodTypeChange}>Search</button>
                </p>
                <p>
                    Search restaurants by area {' '}
                    <input
                        type="text"
                        name="area"
                        placeholder="five digit zip code"
                        value={this.state.area}
                        onChange={this.handleChange}/>
                    <button onClick={this.handleAreaChange}>Search</button>
                </p>
                <p>
                    Search restaurants by lowest rating {' '}
                    <input
                        type="text"
                        name="lowestRating"
                        placeholder="lowest rating (0-5)"
                        value={this.state.lowestRating}
                        onChange={this.handleChange}/>
                    <button onClick={this.handleLowestRatingChange}>Search</button>
                </p>
            </form>
        );
    }
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
    }

    handleAreaChange(area) {
        var queryBody = {
            "address.zipcode": area
        };
        findRestaurant(queryBody).then((res) => {
            this.setState({restaurants: res.restaurants})
        })
    };

    handleLowestRatingChange(lowestRating) {
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
                <SearchBar
                    foodType={this.state.foodType}
                    area={this.state.area}
                    lowestRating={this.state.lowestRating}
                    onFoodTypeChange={this.handleFoodTypeChange}
                    onAreaChange={this.handleAreaChange}
                    onLowestRatingChange={this.handleLowestRatingChange}/>
                <RestaurantTable restaurants={this.state.restaurants}/>
            </div>
        );
    }
}
