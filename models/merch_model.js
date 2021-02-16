const mongoose = require('mongoose')

const foodSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    price: {
        type: String,
        require: true
    },
    catagory: {
        type: Array,
        require: true
    },
    tag: {
        type: Array,
        require: true
    },
});


module.exports = mongoose.model('Food', foodSchema)