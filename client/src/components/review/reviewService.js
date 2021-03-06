export function createReview(restaurantId, content, rating, price) {
    var newReview = {
        restaurantId: restaurantId,
        content: content,
        rating: rating,
        price: price,
    }

    return fetch('/api/restaurant/' + restaurantId + '/review', {
        method: 'POST',
        credentials: "same-origin",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newReview)
    })
}

export function findReviewsByUserId(userId) {
    // TODO: get reviews
    return fetch('/api/user/'+userId+'/reviews', {
        method: 'GET',
        credentials: "same-origin",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then((res) => {
        return res.json()
    })
}

export function updateReview(reviewId, review) {
    return fetch('/api/review/' + reviewId, {
        method: 'PUT',
        credentials: "same-origin",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(review)
    })
}

export function deleteReview(reviewId) {
    return fetch('/api/review/' + reviewId, {
        method: 'DELETE',
        credentials: "same-origin",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
}



