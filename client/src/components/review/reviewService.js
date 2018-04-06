export function createReview(restaurantId, userId, content, rating) {
    var date = new Date();
    var newReview = {
        restaurantId: restaurantId,
        userId: userId,
        content: content,
        rating: rating,
        addedDate: date.getDate()
    }

    return fetch('/restaurants/' + restaurantId + 'newReview', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newReview)
    })
}
