let UserSchema = require('./restaurant.schema');
let mongoose = require('mongoose');
let User = mongoose.model("User", UserSchema);

User.createUser = createUser;

function createUser(newUser) {
    User.register(newUser, )
}


module.exports = User;