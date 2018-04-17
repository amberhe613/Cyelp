import React from 'react';
import {Link} from 'react-router-dom';
import './landing.css'

export default class Landing extends React.Component {
    render() {
        return (
            <div>
                <div id="landing-header">
                    <h1>Welcome to Cyelp!</h1>
                    <hr/>
                </div>
                <ul class="slideshow">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>

        )
    }
}