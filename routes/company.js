var express = require('express');
var router = express.Router();
// models
var Company = require('../models/company_model')

// add companies
router.post('/', async(req, res) => {
    const { name, address, catagory, description, password } = req.body;
    console.log("your info is made ", name, address, catagory, password)
    try {
        const company = await Company.create({ name, address, catagory, description, password });
        res.status(201).json({ company });
    } catch (err) {
        //const errors = handleErrors(err);
        res.status(400).json({ err });
    }
})

/* GET companies list. */
router.get('/', async(req, res) => {
    comp = Company.find().sort({ createdAt: -1 })
        .then(result => {
            res.json({ compnaies: result });
        })
        .catch(err => {
            console.log(err);
        });
});



module.exports = router;


// 👉 Get All restaurants 
// 👉 Get Single Restaurant Information By ID
// 👉 Search Foods By Category
// 👉 Search Foods By The Name
// 👉 Search Foods  With A Price of  100 Birr or Less 
// 👉 Search Foods  With A Price of 100 Birr - 200 Birr
// 👉 Search Foods  With A Price of  200 Birr or more 
// 👉 Search foods By hashtag