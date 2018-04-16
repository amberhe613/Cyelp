import React, {Component} from 'react';
import {Link, Route, Redirect} from 'react-router-dom';
import Login from './components/user/view/Login';
import Profile from './components/user/view/Profile';
import {Restaurant} from './components/restaurant/view/restaurant';
import NewRestaurant from './components/restaurant/view/newRestaurant';
import Reviews from './components/review/view/reviews';
// import {checkLogin} from './components/user/userService';
import {RestaurantList} from './components/restaurant/view/restaurantList';

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
        // checkLogin().then((res) => {
        //     this.setState({
        //         userId: res._id,
        //         isAuthenticated: res._id !== null
        //     })
        // })
    }

    authenticateUser(userId) {
        this.setState({isAuthenticated: true, userId: userId})
    }

    render() {

        return (
            <div>
                {window.location.pathname === "/"
                    ? <Redirect to="/restaurants"/>
                    : null}
                {/* <div className="header"> */}
                <Link to="/login"></Link>
                <Link to="/user/:userId"></Link>
                <Link to="/restaurants"></Link>
                <Link to="/restaurants/:restaurantId"></Link>
                <Link to="/newrestaurant"></Link>
                <Link to="/user/:userId/reviews"></Link>
                <Route
                    exact
                    path="/login"
                    render={props => <Login {...props}/>}/>
                <Route
                    exact
                    path="/user/:userId"
                    render={() => <Profile />}/>
                <Route exact path="/restaurants" component={RestaurantList}/>
                <Route
                    exact
                    path="/restaurants/:restaurantId"
                    render={props => <Restaurant {...props} />}/>
                <Route
                    exact
                    path="/newRestaurant"
                    render={(props) => <NewRestaurant {...props} />}/>
                <Route
                    exact
                    path="/user/:userId/reviews"
                    render={props => <Reviews {...props}/>}/>
 
            </div>
        );
    }
}

export default App;