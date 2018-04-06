import React, {Component} from 'react';
import {Link, Route} from 'react-router-dom';
import {Cookies} from 'react-cookie';
import Login from './components/user/view/Login';
import Profile from './components/user/view/Profile';
import Restaurant from './components/restaurant/view/restaurant';
import {RestaurantList} from './components/restaurant/view/restaurantList';
import NewRestaurant from './components/restaurant/view/newRestaurant';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false,
            userId: ''
        };
        this.handleLogin = this
            .handleLogin
            .bind(this);
        this.handleLogout = this
            .handleLogout
            .bind(this);
    }

    componentWillMount() {
        /*
        now use cookies to handle login status
        user may modify cookies so its unsafe
        may need better authentication method
        */
        var cookies = new Cookies()
        this.setState({
            isAuthenticated: cookies.get('isAuthenticated'),
            userId: cookies.get('userId')
        })
    }

    authenticateUser(userId) {
        this.setState({isAuthenticated: true, userId: userId})
    }

    render() {
        return (
            <div>
                <Link to="/login"></Link>
                <Link to="/user/:userId"></Link>
                <Link to="/restaurants"></Link>
                <Link to="/user/:userId/newrestaurant"></Link>
                <Route
                    exact
                    path="/login"
                    render={props => <Login {...props} authenticateUser={this.authenticateUser}/>}/>
                <Route
                    exact
                    path="/user/:userId"
                    render={() => <Profile isAuthenticated={this.state.isAuthenticated}/>}/>
                <Route exact path="/restaurants" compoennt={RestaurantList}/>
                <Route
                    exact
                    path="/restaurants/a/:restaurantId"
                    render={props => <Restaurant {...props} userId={this.state.userId}/>}/>
                <Route
                    exact
                    path="/user/:userId/newRestaurant"
                    render={() => <NewRestaurant isAuthenticated={this.state.isAuthenticated}/>}/>
            </div>
        );
    }
}

export default App;
