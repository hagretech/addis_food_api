// middlewere 
const tokenDecoder = require('./tokenDecoder');

// models
const User = require('../models/hotel_model');

async function currentUser(token) {
    // check the user
    const id = tokenDecoder(token);
    const user = await User.findById(id);
    if (user) {
        return user
    } else {
        return (null)
    }
}
module.exports = currentUser