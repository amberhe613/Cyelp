function RestaurantList(props) {
    return (
        <div>
            props.restaurants.map(r => (
               <Restaurant restaurant={r} />
            ))
        </div>
    )
}

function Restaurant(props) {
    return (
        <li>
            name:{props.restaurant.name}
        </li>
    )
}

export default RestaurantList;