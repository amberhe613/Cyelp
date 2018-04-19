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

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurants: null,
            isAuthenticated: false
        };
    }

    async componentDidMount() {
        await checkAdmin().then((res) => {
            if (res.role === "ADMIN") {
                this.setState({isAuthenticated: true})
            } else {}
        })
    }

    async findDeletionRequests() {
        var queryBody = {
            deleteRequested: true
        };

        await findRestaurant(queryBody).then((res) => {
            this.setState({restaurants: res.restaurants})
        }).catch((err) => {});
    }

    async findUpdateRequests() {
        var queryBody = {
            updateRequested: true
        };

        await findRestaurant(queryBody).then((res) => {
            this.setState({restaurants: res.restaurants})
        }).catch((err) => {});
    }

    render() {
        if (this.state.isAuthenticated) {
            return (
                <div>
                    <Container fluid>
                        <Button onClick={this.findDeletionRequests}>Find restaurants with deletion requests</Button>
                        {this.state.restaurants !== null
                            ? <RestaurantTable restaurants={this.state.restaurants}/>
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
