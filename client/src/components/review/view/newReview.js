import React from 'react';
import {createReview} from '../reviewService';

export default class NewReview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: '',
            rating: '',
            price: '',
        };
        this.handleChange = this
            .handleChange
            .bind(this);
        this.handleSubmit = this
            .handleSubmit
            .bind(this);
    }

    handleChange(e) {
        e.preventDefault()
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit() {
        createReview(this.props.restaurant._id, this.state.content, this.state.rating, this.state.price)
        .then((res)=>{
            window.location = "/restaurants/"+this.props.restaurant._id
        }).catch((err)=>{
            console.log("newReview 32"+err)
        })
    }

    render() {
        if (this.props.userId !== '') {
            return (
                <div>
                    Create a new review for restaurant {this.props.restaurant.name}
                    <form>
                        <p>
                            Content
                            <input
                                type="text"
                                name="content"
                                value={this.state.content}
                                onChange={this.handleChange}/>
                        </p>
                         <p>
                            Rating
                            <input
                                type="text"
                                name="rating"
                                placeholder="1-5"
                                value={this.state.rating}
                                onChange={this.handleChange}/>
                        </p>
                         <p>
                            Price
                            <input
                                type="text"
                                name="price"
                                value={this.state.price}
                                onChange={this.handleChange}/>
                        </p>
                    </form>
                    <button onClick={this.handleSubmit}>Submit review</button>
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
