import React from 'react';
import {
    createRestaurant,
} from '../restaurantService';


export default class NewRestaurant extends React.Component {
    // need a props for userId
    constructor(props) {
        super(props);
        this.state = {
            foodType: '',
            area: '',
            name: '',
        };

        this.handleFoodTypeChange = this.handleFoodTypeChange.bind(this);
        this.handleAreaChange = this.handleAreaChange.bind(this);
        this.handleNameChange = this.handleLowestRatingChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleAreaChange(area) {
        this.setState({
            area: area
        })
    }

    handleNameChange(lowestRating) {
        this.setState({
            name: name
        })
    }

    handleFoodTypeChange(foodType) {
        this.setState({
            foodType: foodType
        })
    }

    handleSubmit() {
        createRestaurant(this.props.userId, this.name, this.location, this.foodType);
    }

    render() {
        if (this.props.userId === '') {
            return (
                <div>
                    Please log in
                </div>
            )
        } else {
            return (
            <div>
                    Create a new restaurant
             <form>
                        <p>
                            Restaurant Name
                    {' '}
                            <input
                                type="text"
                                placeholder=""
                                value={this.props.name}
                                onChange={this.handleNameChange}
                            />
                        </p>
                        <p>
                            Location
                    {' '}
                            <input
                                type="text"
                                placeholder="five digit zip code"
                                value={this.props.area}
                                onChange={this.handleAreaChange}
                            />
                        </p>
                        <p>
                            Food Type
                    {' '}
                            <input
                                type="text"
                                placeholder="hunan, sichuan..."
                                value={this.props.foodType}
                                onChange={this.handleFoodTypeChange}
                            />
                        </p>
                    </form>
                    <button onclick="handleSubmit()">Create new restaurant</button>
            </div>
            );

        }
    }
}
