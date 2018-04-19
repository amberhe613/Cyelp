import React from 'react';
import {checkAdmin} from '../userService';
import {findRestaurant} from '../../restaurant/restaurantService';
import {RestaurantTable} from '../../restaurant/view/restaurantList';
import {
    Navbar,
    NavbarBrand,
    NavItem,
    NavLink,
    Nav,
    Button,
    Container
} from 'reactstrap';

export default class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurants: null,
            isAuthenticated: false
        };
        this.findDeletionRequests = this
            .findDeletionRequests
            .bind(this);
        this.findUpdateRequests = this
            .findUpdateRequests
            .bind(this);
    }

    async componentDidMount() {
        await checkAdmin().then((res) => {
            if (res.role === "ADMIN") {
                this.setState({isAuthenticated: true})
            } else {}
        })
        this.findDeletionRequests();
    }

    async findDeletionRequests() {
        var queryBody = {
            deleteRequested: true
        };

        await findRestaurant(queryBody).then((res) => {
            console.log("find delete restaurants success")
           this.setState({restaurants: res.restaurants})
       }).catch((err) => {});
    }

    async findUpdateRequests() {
        var queryBody = {
            updateRequested: true
        };

        await findRestaurant(queryBody).then((res) => {
            console.log("find update restaurants success")
            this.setState({restaurants: res.restaurants})
        }).catch((err) => {});
    }

    render() {
        if (this.state.isAuthenticated) {
            return (
                <div>
                    <Container fluid>
                        {/* <Button onClick={this.findDeletionRequests}>Find restaurants with deletion requests</Button> */}
                        {/* <Button onClick={this.findUpdateRequests}>Find restaurants with update requests</Button> */}
                        {this.state.restaurants !== null
                            ? <RestaurantTable isAdmin={true} restaurants={this.state.restaurants}/>
                            : null}
                    </Container>
                </div>
            );
        } else {
            return (
                <div>
                    Please log in as admin
                </div>
            )

        }
    }
}
