import React from 'react';
import {Button} from 'reactstrap';
import './landing.css'

export default class Landing extends React.Component {
    render() {
        return (
            <div>
                <div id="landing-header">
                    <h1>Welcome to Cyelp!</h1>
                    <hr/>
                    <a href={"/restaurants"}>
                        <Button>
                            Go Chinese Food!
                        </Button>
                    </a>
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