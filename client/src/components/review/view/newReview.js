import React from 'react';
import {createReview} from '../reviewService';
import {checkLogin} from '../../user/userService';
import StarRatingComponent from 'react-star-rating-component';
import {
    Container,
    Button,
    Form,
    FormGroup,
    Input,
    Label
} from 'reactstrap';

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
                    <Form>
                        <FormGroup>
                            <Label for="content">Content</Label>
                            <Input
                                type="text"
                                name="content"
                                id="content"
                                value={this.state.content}
                                onChange={this.handleChange}/>
                        </FormGroup>
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
                        <FormGroup>
                            <Label for="price">Price</Label>
                            <Input
                                type="text"
                                name="price"
                                id="price"
                                value={this.state.price}
                                onChange={this.handleChange}/>
                        </FormGroup>
                    </Form>
                    <Button onClick={this.handleSubmit}>Submit review</Button>
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
