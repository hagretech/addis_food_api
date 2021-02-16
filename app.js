const express = require('express');
const app = express();
const port = 8080;
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const body_parser = require('body-parser');
const morgan = require('morgan');

// imported routes
const hotel_auth_route = require('./routes/hotel_auth');
const merch_route = require('./routes/merch');
const order_route = require('./routes/order')
    // const user_dashboard = require('./routes/user_main_routes');


// middlewares
// middleware
app.use(express.static('public'));
app.use(body_parser.json());
app.use(cookieParser());
app.use(express.json());
app.use(morgan('tiny'));

// view engine
app.set('view engine', 'ejs');





// routes
app.use('/hotel', hotel_auth_route);
app.use('/merch', merch_route);
// app.use('/order', order_route);
// app.use('/user', user_dashboard);

// db connect
mongoose.connect('mongodb+srv://pass:pass@node.dakub.mongodb.net/delivery?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log('database connected'));


// SERVER LISTINING
app.listen(port, () => console.log(`hagre_delivery is running`));