import React from 'react';
import {
    findRestaurantsByType,
    findRestaurantsByArea,
    findRestaurantsByLowestRating
} from '../restaurantService';

// fix the number of query for now
const N = 30;

class RestaurantRow extends React.Component {
    render() {
        const restaurant = this.props.restaurant;

        return (
            <tr>
                <a herf={"/restaurant" + restaurant.id}>
                    <td>{restaurant.name}</td>
                </a>
                <td>{restaurant.location}</td>
                <td>{restaurant.footType}</td>
                <td>{restaurant.averageRating}</td>
                <td>{restaurant.averagePrice}</td>
            </tr>
        );
    }
}

class RestaurantTable extends React.Component {
    render() {
        const rows = [];
        this.props.restaurants.forEach((restaurant) => {
            rows.push(
                <RestaurantRow
                    restaurant={restaurant}
                    key={restaurant.id}
                />
            );
        });

        return (
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Location</th>
                        <th>footType</th>
                        <th>averageRating</th>
                        <th>averagePrice</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
}

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleFoodTypeChange = this.handleFoodTypeChange.bind(this);
        this.handleAreaChange = this.handleAreaChange.bind(this);
        this.handleLowestRatingChange = this.handleLowestRatingChange.bind(this);
    }

    handleFoodTypeChange(e) {
        this.props.onFoodTypeChange(e.target.value);
    }

    handleAreaChange(e) {
        this.props.onAreaChange(e.target.value);
    }

    handleLowestRatingChange(e) {
        this.props.onLowestRatingChange(e.target.value);
    }

    render() {
        return (
            <form>
                <p>
                    Search restaurants by food type
                    {' '}
                    <input
                        type="text"
                        placeholder="food type (sichuan, hunan...)"
                        value={this.props.foodType}
                        onChange={this.handleFoodTypeChange}
                    />
                </p>
                <p>
                    Search restaurants by area
                    {' '}
                    <input
                        type="text"
                        placeholder="five digit zip code"
                        value={this.props.area}
                        onChange={this.handleAreaChange}
                    />
                </p>
                <p>
                    Search restaurants by lowest rating
                    {' '}
                    <input
                        type="text"
                        placeholder="lowest rating (0-5)"
                        value={this.props.lowestRating}
                        onChange={this.handleLowestRatingChange}
                    />
                </p>
            </form>
        );
    }
}

export default class RestaurantList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [{}],
            foodType: '',
            area: '',
            lowestRating: '',
        };

        this.handleFoodTypeChange = this.handleFoodTypeChange.bind(this);
        this.handleAreaChange = this.handleAreaChange.bind(this);
        this.handleLowestRatingChange = this.handleLowestRatingChange.bind(this);
    }

    handleAreaChange(area) {
        // may need to use async function here
        var products = findRestaurantsByArea(area, N);

        this.setState({
            products: products
        })
    }


    handleLowestRatingChange(lowestRating) {
        var products = findRestaurantsByLowestRating(lowestRating, N);

        this.setState({
            products: products
        })
    }

    handleFoodTypeChange(foodType) {
        var restaurants = findRestaurantsByType(foodType, N);

        this.setState({
            restaurants: restaurants
        })
    }

    render() {
        return (
            <div>
                <SearchBar
                    foodType={this.foodType}
                    area={this.area}
                    lowestRating={this.lowestRating}
                    onFoodTypeChange={this.handleFoodTypeChange}
                    onAreaChange={this.handleAreaChange}
                    onLowestRatingChange={this.handleLowestRatingChange}
                />
                <RestaurantTable
                    restaurants={this.props.restaurants}
                />
            </div>
        );
    }
}

