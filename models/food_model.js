const mongoose = require('mongoose')

const foodSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    catagory: {
        type: String,
        required: true
    },
    tag: {
        type: Array,
        required: true
    },
    company_id: {
        type: String,
        required: true,
    },
    company_name: {
        type: String,
        required: true
    },
    company_address: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model('Food', foodSchema)