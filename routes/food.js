var express = require('express');
const { format } = require('morgan');
var router = express.Router();
// models
var Company = require('../models/company_model')
var Food = require('../models/food_model')

// add food
router.post('/', async(req, res) => {
    const { name, price, tag, catagory, company_id, } = req.body;
    console.log("your info is made ", name, catagory, )
    try {
        const company = await Company.findById(company_id)
            .then(async company => {
                const company_name = company.name;
                const company_address = company.address;
                const food = await Food.create({ name, price, catagory, tag, company_id, company_address, company_name });
                res.status(201).json({ food });
            })

    } catch (err) {
        //const errors = handleErrors(err);
        res.status(400).json({ err });
    }
})

// get food with compnay id



/* GET foods form companies. */
router.get('/company/:company_id', (req, res, ) => {
    var company_id = req.params.company_id
    comp = Company.findById(company_id)
        .then(company => {
            food = Food.find()
                .then(foods => {
                    res.json({ company, foods })
                })
                .catch(err => { res.json(err) })
        })
        .catch(err => {
            console.log(err);
        });
});

// get foodby catagory
router.get('/catagory/:cat', (req, res) => {
    var cat = req.params.cat;
    foods = Food.find({ 'catagory': cat })
        .then(foods => {
            res.json(foods)
        })
        .catch(err => {
            console.log(err);
        })
})

// get food with price range
router.get('/range', (req, res) => {
    const from = req.query.from;
    const upto = req.query.upto
    console.log('*******************', from, upto)
    const food = Food.find({ "price": { "$gt": from, "$lt": upto } })
        .then(foods => {
            res.json({ foods })
        })
        .catch(err => {
            res.json(err)
        })

})

// get food by hashtag
router.get('/tag/:tag', (req, res) => {
    const tag = req.params.tag
    console.log(tag)
    const food = Food.find({ "tag": tag })
        .then(foods => {
            res.json({ foods })
        })
        .catch(err => {
            res.json(err)
        })

})

// get food by name
router.get('/name/:name', (req, res) => {
    const name = req.params.name
    console.log(name)
    const food = Food.find({ "tag": name })
        .then(foods => {
            res.json({ foods })
        })
        .catch(err => {
            res.json(err)
        })

})

module.exports = router;

// TO DO

// auth for compnaies routes
// restict compnay endpoints

// company description 
// search by name

// DONE 

// 👉 Search foods By hashtag
// 👉 Get All restaurants 
// 👉 Get Single Restaurant Information By ID
// 👉 Search Foods By Category
// 👉 Search Foods By The Name
// 👉 Search Foods  With A Price of  100 Birr or Less 
// 👉 Search Foods  With A Price of 100 Birr - 200 Birr
// 👉 Search Foods  With A Price of  200 Birr or more