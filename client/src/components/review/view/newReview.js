import React from 'react';
import {createReview} from '../reviewService';
import {checkLogin} from '../../user/userService';
import StarRatingComponent from 'react-star-rating-component';

export default class NewReview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: '',
            rating: 1,
            price: '',
            isAuthenticated: false,
            userId: null,
        };
        this.handleChange = this
            .handleChange
            .bind(this);
        this.handleSubmit = this
            .handleSubmit
            .bind(this);
    }

    onStarClick(nextValue, prevValue, name) {
        this.setState({rating: nextValue});
    }

    async componentDidMount() {
        await checkLogin().then((res) => {
            if (res._id !== null) {
                this.setState({isAuthenticated: true, userId: res._id})
            } else {}
        })
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
        const { rating } = this.state;
        if (this.state.userId !== null) {
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
                             <StarRatingComponent
                                 name="rate"
                                 starCount={5}
                                 value={rating}
                                 onStarClick={this.onStarClick.bind(this)}
                             />

                            {/*<input*/}
                                {/*type="text"*/}
                                {/*name="rating"*/}
                                {/*placeholder="1-5"*/}
                                {/*value={this.state.rating}*/}
                                {/*onChange={this.handleChange}/>*/}
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
