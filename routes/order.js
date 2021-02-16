const express = require('express')
const router = express.Router()

// middlewares
const merchAuth = require('../middlewares/merchAuthMiddleware');
const tokenDecoder = require('../middlewares/tokenDecoder');

// models 
const Order = require('../models/order_model');


router.get('/', merchAuth, (req, res) => {
    res.json({ 'value': 'done!!!!!' });
});


// ******** todo list
// separete the token decoder

// user registering route 
router.post('/', merchAuth, (req, res) => {
    const mjwt = req.cookies.mjwt;
    const jwt = req.cookies.jwt;

    var from = tokenDecoder(mjwt);
    var to = tokenDecoder(jwt);
    // validation 
    if (req.body.name == undefined) {
        res.json({ "error": "product name is undefined" })
    }

    const new_order = new Order({
        "name": req.body.name,
        "from": from,
        "to": to
    });
    console.log(new_order);
    // saving user to db 
    new_order.save()
        .then(data => console.log(data))
        .catch(err => console.log(err))
    res.send({ 'new order': new_order })
})



module.exports = router