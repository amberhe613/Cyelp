import React, { Component } from 'react';
import {Link, Route, Redirect} from 'react-router-dom';
import {RestaurantList} from './components/restaurant/view/restaurantList';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Link to="/restaurants"></Link>
        <Route exact path="/restaurants" compoennt={RestaurantList} />>
      </div>
   );
  }
}

export default App;
