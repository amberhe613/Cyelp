import React, {Component} from 'react';
import {Link, Route, Redirect} from 'react-router-dom';
import Landing from './components/landing/Landing';
import Login from './components/user/view/Login';
import Admin from './components/user/view/Admin';
import Profile from './components/user/view/Profile';
import {Restaurant} from './components/restaurant/view/restaurant';
import NewRestaurant from './components/restaurant/view/newRestaurant';
import Reviews from './components/review/view/reviews';
// import {checkLogin} from './components/user/userService';
import {RestaurantList} from './components/restaurant/view/restaurantList';
import {Navbar, NavbarBrand, NavItem, NavLink, Nav, Jumbotron, Container, Input, Button, Table } from 'reactstrap';

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
                    ? <Redirect to="/home"/>
                    : null}
                {/* <div className="header"> */}
                {/* <Navbar color="light" light expand="xs">
                    <NavbarBrand href="/restaurants">Cyelp</NavbarBrand>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink href="/login">Login</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href={"/user/"+this.state.userId}>Profile</NavLink>
                        </NavItem>
                    </Nav>
                </Navbar> */}
 
                <Link to="/login"></Link>
                <Link to="/admin"></Link>
                <Link to="/user/:userId"></Link>
                <Link to="/restaurants"></Link>
                <Link to="/restaurants/:restaurantId"></Link>
                <Link to="/newrestaurant"></Link>
                <Link to="/user/:userId/reviews"></Link>
                <Route
                    exact
                    path="/home"
                    render={props => <Landing/>}/>
                <Route
                    exact
                    path="/admin"
                    render={props => <Admin/>}/>
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