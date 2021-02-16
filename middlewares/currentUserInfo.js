const jwt = require('jsonwebtoken');
const tokenDecoder = require('./tokenDecoder');

// models
const User = require('../models/hotel_model');
const Merch = require('../models/merch_model');


async function currentUserInfo(req, res, next) {
    // check the user
    const id = tokenDecoder(req.cookies.jwt);
    const user = await User.findById(id);
    if (user) {
        console.log("***********your user***************");
        console.log(user.email);
        console.log(user._id);
        console.log("***********end***************");
    } else {
        console.log("***********your user***************");
        console.log('un auth user');
        console.log("***********end***************");

        res.json({ 'error': 'please login' })
    }

    // check the merchant 
    const m_id = tokenDecoder(req.cookies.mjwt)
    const merch = await Merch.findById(m_id)
    if (merch) {
        console.log("***********your merch***************")
        console.log(merch.username)
        console.log(merch._id)
        console.log("***********end***************")
    } else {
        console.log("***********your merch***************")
        console.log('un auth merch')
        console.log("***********end***************")
    }
    next();
}

module.exports = currentUserInfo