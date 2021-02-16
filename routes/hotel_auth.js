const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// middlewere 
const createJSONToken = require('../middlewares/jsonWebTokenCreator')
    //models
const hotel_model = require('../models/hotel_model');

// handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '' };

    // incorrect email
    if (err.message === 'incorrect email') {
        errors.email = 'That email is not registered';
    }

    // incorrect password
    if (err.message === 'incorrect password') {
        errors.password = 'That password is incorrect';
    }

    // duplicate email error
    if (err.code === 11000) {
        errors.email = 'that email is already registered';
        return errors;
    }

    // validation errors
    if (err.message.includes('user validation failed')) {
        // console.log(err);
        Object.values(err.errors).forEach(({ properties }) => {
            // console.log(val);
            // console.log(properties);
            errors[properties.path] = properties.message;
        });
    }

    return errors;
}



// get sinuppage
router.get('/signup', (req, res) => {
    res.render('signup');
});

//get loginpage 
router.get('/login', (req, res) => {
    res.render('login');
});


// post requests

// post signup 
router.post('/signup', async(req, res) => {
    const { email, password } = req.body;
    console.log("your info is made ", email, password)
    try {
        const hotel = await hotel_model.create({ email, password, phone, address });
        const token = createJSONToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ user: hotel._id });
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }

});

// login post
router.post('/login', async(req, res) => {
    const maxAge = 3 * 24 * 60 * 60;
    const { email, password } = req.body;
    res.cookie('jwt', '', { maxAge: 1 });
    try {
        const user = await User.login(email, password);
        var token = '';
        token = createJSONToken(user._id);
        console.log('!!! trying to log', user, 'token', token)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ user: user._id });
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
});


// logout
router.get('logout', logout_get = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
});

module.exports = router