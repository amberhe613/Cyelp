import React from 'react';
import {createReview} from '../reviewService';

export default class NewReview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: '',
            rating: null
        };
        this.handleChange = this
            .handleChange
            .bind(this);
        this.handleSubmit = this
            .handleSubmit
            .bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit() {
        createReview(this.props.restaurantInfo._id, this.props.userId, this.state.content, this.state.rating)
        .then((res)=>{
            this.props.history.push('restaurants')
        }).catch((err)=>{
            console.log(err)
        })
    }

    render() {
        if (this.props.userId !== '') {
            return (
                <div>
                    Create a new review for restaurant {this.props.restaurantName}
                    <form>
                        <p>
                            Content
                            <input
                                type="text"
                                name="content"
                                value={this.state.content}
                                onChange={this.handleChange}/>
                        </p>
                    </form>
                    <button onclick={this.handleSubmit}>Submit review</button>
                </div>
            );
        } else {
            return (
                <div>
                    Invalid page!
                </div>
            )

        }
    }
}
