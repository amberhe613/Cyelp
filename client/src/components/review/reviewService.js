export function createReview(restaurantId, content, rating, price) {
    var newReview = {
        restaurantId: restaurantId,
        content: content,
        rating: rating,
        price: price,
    }

    return fetch('/api/restaurant/' + restaurantId + '/review', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newReview)
    })
}
