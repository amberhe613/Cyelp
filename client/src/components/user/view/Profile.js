import React from 'react';
import {findUserById, findCreatedRestaurants, findSavedRestaurants, findReviewedRestaurants} from '../userService';
import {RestaurantTable} from '../../restaurant/view/restaurantList'

class UserTable extends React.Component {
    render() {
        return (
            <form>
                Hi {this.props.userInfo.username}
            </form>
        );
    }
}

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurants: [
                {}
            ],
            userInfo: {}
        };
        this.findCreatedRestaurants = this
            .findCreatedRestaurants
            .bind(this);
        this.findSavedRestaurants = this
            .findSavedRestaurants
            .bind(this);
        this.findReviewedRestaurants = this
            .findReviewedRestaurants
            .bind(this);
    }

    componentDidMount() {
        if (this.props.isAuthenticated) {
            findUserById(this.props.userId).then((res) => {
                this.setState({userInfo: res})
            }).catch((err) => {
                console.log("findUserById failure")
            });
        }
    }

    // BUG: this.findCreatedRestaurants vs findCreatedRestaurants? BUG: rerender
    // when restaurants change or need to add lifecycle
    findCreatedRestaurants() {
        findCreatedRestaurants(this.state.userInfo.userId).then((res) => {
            this.setState({restaurants: res.restaurants})
        }).catch((err) => {
            console.log("findCreatedRestaurants failure")
        });
    }

    findSavedRestaurants() {
        findSavedRestaurants(this.state.userInfo.userId).then((res) => {
            this.setState({restaurants: res.restaurants})
        }).catch((err) => {
            console.log("findSavedRestaurants failure")
        });
    }

    findReviewedRestaurants() {
        findReviewedRestaurants(this.state.userInfo.userId).then((res) => {
            this.setState({restaurants: res.restaurants})
        }).catch((err) => {
            console.log("findReviewedRestaurants failure")
        });
    }

    render() {
        if (this.props.isAuthenticated) {
            return (
                <div>
                    <UserTable userInfo={this.state.userInfo}/> {/* BUG: create own history instance? */}
                    {/* <Route
                        render={({history}) => (
                        <button
                            onclick={() => {
                            history.push('/user/' + this.state.userInfo.userId + '/newRestaurant')
                        }}>Create New Restaurant</button>
                    )}/> */}
                    <a href="/newRestaurant">
                        Create New Restaurant
                    </a>
                    <button onclick={this.findCreatedRestaurants}>Get All Created Restaurants</button>
                    <button onclick={this.findSavedRestaurants}>Get All Saved Restaurants</button>
                    {/* <button onclick={this.findReviewedRestaurants}>Get All Reviewed Restaurants</button> */}
                    <RestaurantTable restaurants={this.props.restaurants}/>
                </div>
            );
        } else {
            return (
                <div>
                    Please log in
                </div>
            )

        }
    }
}
