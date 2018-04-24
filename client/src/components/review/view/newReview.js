import React from 'react';
import {createReview} from '../reviewService';
import {checkLogin} from '../../user/userService';
import StarRatingComponent from 'react-star-rating-component';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import {Button, FormGroup} from 'reactstrap';

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
                    <h3>Create a new review for restaurant {this.props.restaurant.name}</h3>

                    <AvForm onValidSubmit={this.handleSubmit}>
                        <AvField type="text" name="content" required value={this.state.content} label="Content"
                                 errorMessage="Review content is required!" onChange={this.handleChange}/>
                        <FormGroup>
                            <div>Rating</div>
                            <StarRatingComponent
                                name="rate"
                                id="rate"
                                starCount={5}
                                value={rating}
                                onStarClick={this.onStarClick.bind(this)}
                            />
                        </FormGroup>
                        <AvField type="text" name="price" value={this.state.price} onChange={this.handleChange} label="Price"/>
                        <FormGroup>
                            <Button >Submit review</Button>
                        </FormGroup>
                    </AvForm>
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
