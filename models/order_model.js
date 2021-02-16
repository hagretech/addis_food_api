const mongoose = require('mongoose')

const OrderSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, 'please add your order name']

    },
    from: {
        type: String,
        require: [true, 'please add store name ']
    },
    to: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Order', OrderSchema)