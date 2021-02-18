const mongoose = require('mongoose')

const foodSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    catagory: {
        type: Array,
        required: true
    },
    tag: {
        type: Array,
        required: true
    },
    company_id: {
        type: String,
        required: true,
    }
});


module.exports = mongoose.model('Food', foodSchema)