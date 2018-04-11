import React from 'react';
import {checkLogin} from '../../user/userService';
import {createRestaurant} from '../restaurantService';

export default class NewRestaurant extends React.Component {
    // need a props for userId
    constructor(props) {
        super(props);
        this.state = {
            foodType: '',
            area: '',
            name: ''
        };

        this.handleChange = this
            .handleChange
            .bind(this);
        this.handleSubmit = this
            .handleSubmit
            .bind(this);
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
        console.log("newrestaurant 41")
        console.log(this.state.name)
        createRestaurant(this.state.name, this.state.area, this.state.foodType)
        .then(res=>{
            this.props.history.push("/user/"+this.state.userId)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    render() {
        // TODO: clean up codes use handlechange
        if (this.state.isAuthenticated) {
            return (
                <div>
                    Create a new restaurant
                    <form>
                        <p>
                            Restaurant Name {' '}
                            <input
                                type="text"
                                placeholder=""
                                name="name"
                                value={this.state.name}
                                onChange={this.handleChange}/>
                        </p>
                        <p>
                            Location {' '}
                            <input
                                type="text"
                                name="area"
                                placeholder="five digit zip code"
                                value={this.state.area}
                                onChange={this.handleChange}/>
                        </p>
                        <p>
                            Food Type {' '}
                            <input
                                type="text"
                                name="foodType"
                                placeholder="Hunan, Sichuan..."
                                value={this.state.foodType}
                                onChange={this.handleChange}/>
                        </p>
                    </form>
                    <button onClick={this.handleSubmit}>Create new restaurant</button>
                </div>
            );
        } else {
            return (
                <div>
                    Please login
                </div>
            )

        }
    }
}
