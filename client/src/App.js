import React, {Component} from 'react';
import {Link, Route, Redirect} from 'react-router-dom';
import Login from './components/user/view/Login';
import Profile from './components/user/view/Profile';
import Restaurant from './components/restaurant/view/restaurant';
import NewRestaurant from './components/restaurant/view/newRestaurant';
import {checkLogin} from './components/user/userService';
import {RestaurantList} from './components/restaurant/view/restaurantList';
import styles from './index.css'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false,
            userId: null
        };
        this.authenticateUser = this
            .authenticateUser
            .bind(this);
    }

    componentWillMount() {
        checkLogin().then((res) => {
            this.setState({
                userId: res._id,
                isAuthenticated: res._id !== null
            })
        })
    }

    authenticateUser(userId) {
        this.setState({isAuthenticated: true, userId: userId})
    }

    render() {

        var styles = {
            color: 'red'
        }
        return (
            <div>
                {window.location.pathname === "/"
                    ? <Redirect to="/restaurants"/>
                    : null}
                {/* <div className="header"> */}
                <div style={styles}>
                    <navbar>
                        "this should be nav bar"
                    </navbar>
                </div>
                <Link to="/login"></Link>
                <Link to="/user/:userId"></Link>
                <Link to="/restaurants"></Link>
                <Link to="/restaurants/:restaurantId"></Link>
                <Link to="/newrestaurant"></Link>
                <Route
                    exact
                    path="/login"
                    render={props => <Login {...props} authenticateUser={this.authenticateUser}/>}/>
                <Route
                    exact
                    path="/user/:userId"
                    render={() => <Profile isAuthenticated={this.state.isAuthenticated}/>}/>
                <Route exact path="/restaurants" component={RestaurantList}/>
                <Route
                    exact
                    path="/restaurants/:restaurantId"
                    render={props => <Restaurant {...props} userId={this.state.userId}/>}/>
                <Route
                    exact
                    path="/newRestaurant"
                    render={(props) => <NewRestaurant {...props} isAuthenticated={this.state.isAuthenticated}/>}/>
            </div>
        );
    }
}

export default App;