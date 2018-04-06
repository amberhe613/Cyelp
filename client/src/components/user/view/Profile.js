import React from 'react';
import {Route} from 'react-router';
import {findUserById, findCreatedRestaurants, findSavedRestaurants, findReviewedRestaurants} from '../userService';
import {RestaurantTable} from '../../restaurant/view/restaurantList'

// fix the number of query for now
const N = 30;

class UserTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: this.props.userInfo
        };
        this.handleOnChange = this
            .handleOnChange
            .bind(this);
    }

    handleOnChange(e) {
        this.setState({
            userInfo: {
                ...this.state.userInfo,
                [e.target.name]: e.target.value
            }
        })
    }

    render() {
        return (
            <form>
                Hi {this.props.userInfo.username}
                <p>
                    Email
                    <input
                        type="text"
                        name="email"
                        placeholder={this.props.userInfo.email}
                        value={this.props.email}
                        onChange={this.handleOnChange}/>
                </p>
                <button
                    onclick={this
                    .props
                    .handleUpdate(this.state.userInfo)}>Update user info</button>
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
            findUserById(this.props.userId, MAX_REVIEWS).then((res) => {
                this.setState({userInfo: res})
            }).catch((err) => {
                console.log("findUserById failure")
            });
        }
    }

    // BUG: this.findCreatedRestaurants vs findCreatedRestaurants? BUG: rerender
    // when restaurants change or need to add lifecycle
    findCreatedRestaurants() {
        findCreatedRestaurants(this.state.userInfo.userId, N).then((res) => {
            this.setState({restaurants: res.restaurants})
        }).catch((err) => {
            console.log("findCreatedRestaurants failure")
        });
    }

    findSavedRestaurants() {
        findSavedRestaurants(this.state.userInfo.userId, N).then((res) => {
            this.setState({restaurants: res.restaurants})
        }).catch((err) => {
            console.log("findSavedRestaurants failure")
        });
    }

    findReviewedRestaurants() {
        findReviewedRestaurants(this.state.userInfo.userId, N).then((res) => {
            this.setState({restaurants: res.restaurants})
        }).catch((err) => {
            console.log("findReviewedRestaurants failure")
        });
    }

    render() {
        if (this.props.isAuthenticated) {
            return (
                <div>
                    <UserTable userInfo={this.state.userInfo}/> 
                    {/* BUG: create own history instance? */}
                    <Route
                        render={({history}) => (
                        <button
                            onclick={() => {
                            history.push('/user/'+this.state.userInfo.userId+'/newRestaurant')
                        }}>Create New Restaurant</button>
                    )}/>
                    <button onclick={this.findCreatedRestaurants}>Get All Created Restaurants</button>
                    <button onclick={this.findSavedRestaurants}>Get All Saved Restaurants</button>
                    <button onclick={this.findReviewedRestaurants}>Get All Reviewed Restaurants</button>
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
