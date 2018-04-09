import React from 'react';
import {findRestaurant} from '../restaurantService';

class RestaurantRow extends React.Component {
    render() {
        const restaurant = this.props.restaurant;

        return (
            <tr>
                <a herf={"/restaurants/" + restaurant._id}>
                    <td>{restaurant.name}</td>
                </a>
                <td>{restaurant.address.zipcode}</td>
                <td>{restaurant.cuisine}</td>
                <td>{restaurant.averageRating}</td>
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
                rows.push(<RestaurantRow restaurant={restaurant} key={restaurant.id}/>);
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
        this
            .props
            .onFoodTypeChange(e.target.value);
    }

    handleAreaChange(e) {
        this
            .props
            .onAreaChange(e.target.value);
    }

    handleLowestRatingChange(e) {
        this
            .props
            .onLowestRatingChange(e.target.value);
    }

    render() {
        return (
            <form>
                <p>
                    Search restaurants by food type {' '}
                    {/* TODO: value and onChange locally */}
                    <input
                        type="text"
                        placeholder="food type (sichuan, hunan...)"
                        value={this.props.foodType}
                        onChange={this.handleFoodTypeChange}/>
                </p>
                <p>
                    Search restaurants by area {' '}
                    <input
                        type="text"
                        placeholder="five digit zip code"
                        value={this.props.area}
                        onChange={this.handleAreaChange}/>
                </p>
                <p>
                    Search restaurants by lowest rating {' '}
                    <input
                        type="text"
                        placeholder="lowest rating (0-5)"
                        value={this.props.lowestRating}
                        onChange={this.handleLowestRatingChange}/>
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
            address: {
                zipcode: area
            }
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
