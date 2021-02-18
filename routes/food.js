const express = require('express');
const router = express.Router();

// model
const food_model = require('../models/food_model')
const comp = require('../models/company_model')

// add food 
router.post('/', async(req, res) => {
    const { name, price, tag, catagory, company_id } = req.body;
    console.log("your info is made ", name, price)
    try {
        const food = await food_model.create({ name, price, catagory, tag, company_id });
        res.status(201).json({ food: food._id });
    } catch (err) {
        //const errors = handleErrors(err);
        res.status(400).json({ err });
    }
});

// get foods in a company
router.get('/:company_id', async(req, res) => {
        const company_id = req.params.company_id;
        console.log('*******', company_id)
        const company = comp.findById(company_id)
            .then(company => {
                const food = food_model.find({ 'company_id': company_id }).sort({ createdAt: -1 })
                    .then(result => {
                        res.json({ food: result, company });
                    })
                    .catch(err => {
                        console.log(err);
                    });
            })
            .catch(err => { console.log(err) })

    })
    // get food by tag

// get foods by cathagory

// get food 
module.exports = router