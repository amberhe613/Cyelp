import React from 'react';
import {checkLogin} from '../../user/userService';
import {createRestaurant} from '../restaurantService';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import {Container, Button, FormGroup} from 'reactstrap';

export default class NewRestaurant extends React.Component {
    // need a props for userId
    constructor(props) {
        super(props);
        this.state = {
            foodType: '',
            area: '',
            name: '',
            description: '',
            image: null,
            isAuthenticated: false,
            userId: null,
            createSuccess: false
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
        console.log("newrestaurant 41");
      createRestaurant(this.state.name, this.state.description, this.state.area, this.state.foodType, this.state.image).then(res => {
            // this.setState({createSuccess: true})
            this
                .props
                .onSuccess()
        }).catch((err) => {
            console.log(err)
        })
    }

    render() {
        // TODO: clean up codes use handlechange
        if (this.state.isAuthenticated) {
            if (this.state.createSuccess) {
                return <div>Create Success!</div>
            }
            return (
                <div>
                    <Container fluid>
                        <AvForm onValidSubmit={this.handleSubmit}>
                            <AvField name="name" label="Restaurant Name" type="text" required value={this.state.name}
                                     errorMessage="Restaurant name is required!" onChange={this.handleChange}/>
                            <AvField name="description" label="description" type="text" value={this.state.description}
                                     onChange={this.handleChange}/>
                            <AvField name="area" label="Location" type="text" placeholder="five digit zip code"
                                     errorMessage="Zip code is required!" value={this.state.area} required onChange={this.handleChange}/>
                            <AvField type="select" required name="foodType" label="Food Type" value={this.state.foodType}
                                     onChange={this.handleChange} errorMessage="Food type is required!">
                                <option>Choose food type</option>
                                <option>Cantonese</option>
                                <option>Sichuan</option>
                                <option>Hunan</option>
                                <option>Fujian</option>
                                <option>Jiangsu</option>
                                <option>Zhejiang</option>
                                <option>Anhui</option>
                                <option>Shandong</option>
                            </AvField>
                            <AvField type="file" name="image" onChange={(e) => this.setState({image: e.target.files[0]})}/>
                            <FormGroup>
                                <Button >Create new restaurant</Button>
                            </FormGroup>
                        </AvForm>
                    </Container>
                </div>
            );
        } else {
            return (
                <div>Error while creating restaurant!</div>
            )
        }
    }
}