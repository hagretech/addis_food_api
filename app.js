const express = require('express');
const app = express();
const port = 8080;
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const body_parser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors')

// imported routes
const company_auth_route = require('./routes/company_auth');
const food_route = require('./routes/food');
const company_route = require('./routes/company');




// middleware
app.use(express.static('public'));
app.use(body_parser.json());
app.use(cookieParser());
app.use(express.json());
app.use(morgan('tiny'));
app.use(cors())

// view engine
app.set('view engine', 'ejs');


// routes
app.use('/company', company_route);
app.use('/food', food_route);
app.use('/', company_auth_route)

// db connect
mongoose.connect('mongodb+srv://pass:pass@node.dakub.mongodb.net/delivery?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log('database connected'));

// SERVER LISTINING
app.listen(port, () => console.log(`addis food api is running`));