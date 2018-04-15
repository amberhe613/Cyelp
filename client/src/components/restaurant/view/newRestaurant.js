import React from 'react';
import {checkLogin} from '../../user/userService';
import {createRestaurant} from '../restaurantService';
import {Navbar, NavbarBrand, NavItem, NavLink, Nav, Container, Button, Form, FormGroup, Input, Label } from 'reactstrap';

export default class NewRestaurant extends React.Component {
    // need a props for userId
    constructor(props) {
        super(props);
        this.state = {
            foodType: '',
            area: '',
            name: '',
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
                    <Navbar color="light" light expand="xs">
                        <NavbarBrand href="/restaurants">Cyelp</NavbarBrand>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="/login">Login</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href={"/user/"+this.state.userId}>Profile</NavLink>
                            </NavItem>
                        </Nav>
                    </Navbar>
                    <Container fluid>
                        <Form>
                            <FormGroup>
                                <Label for="name">Restaurant Name {' '}</Label>
                                <Input
                                    type="text"
                                    placeholder=""
                                    name="name"
                                    id="name"
                                    value={this.state.name}
                                    onChange={this.handleChange}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="name">Location {' '}</Label>
                                <Input
                                    type="text"
                                    name="area"
                                    id="area"
                                    placeholder="five digit zip code"
                                    value={this.state.area}
                                    onChange={this.handleChange}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="foodType">Food Type {' '}</Label>
                                <Input
                                    type="select"
                                    name="foodType"
                                    id="foodType"
                                    value={this.state.foodType}
                                    onChange={this.handleChange}>
                                    <option>Cantonese</option>
                                    <option>Sichuan</option>
                                    <option>Hunan</option>
                                    <option>Fujian</option>
                                    <option>Jiangsu</option>
                                    <option>Zhejiang</option>
                                    <option>Anhui</option>
                                    <option>Shandong</option>
                                </Input>
                            </FormGroup>
                        </Form>
                        <Button onClick={this.handleSubmit}>Create new restaurant</Button>
                    </Container>
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
