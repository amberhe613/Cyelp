import React, { Component } from 'react';
import {Link, Route, Redirect} from 'react-router-dom';
import {Login} from './components/user/view/Login';
import {Restaurant} from './components/restaurant/view/restaurant';
import {RestaurantList} from './components/restaurant/view/restaurantList';
import {NewRestaurant} from './components/restaurant/view/newRestaurant';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: '',
        };

        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogin(userId) {
        this.setState({
            userId: userId
        })
    }

    handleLogout(userId) {
        this.setState({
            userId: ''
        })
    }

  render() {
    return (
      <div>
        <Link to="/login"></Link>
        <Link to="/restaurants"></Link>
        <Link to="/restaurants/new"></Link>
        <Route exact path="/login" render={() => <Login onSuccessLogin={this.handleLogin}/>} />>
        <Route exact path="/restaurants" compoennt={RestaurantList} />>
        <Route exact path="/restaurants/new" render={() => <NewRestaurant userId={this.userId}/>} />>
        <Route exact path="/restaurants/a/:restaurantId" component={Restaurant} />>
      </div>
   );
  }
}

export default App;
