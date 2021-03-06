require('./config/config');
require('./models/db');
require('./config/passportConfig');

const { mongoose } = require('./models/db');
var productDetailsController = require('./controllers/Admin/productDetailsController');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

const rtsIndex = require('./routes/index.router');

var productDetailsController = require('./controllers/Admin/productDetailsController');

var app = express();

// middleware
app.use(bodyParser.json());
//allows request from any port number or domain 
app.use(cors({origin: 'http://localhost:4200'}));
app.use(passport.initialize());
app.use('/api', rtsIndex);

// error handler
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
    else{
        console.log(err);
    }
});

app.use('/productDetails', productDetailsController);
// start server
app.listen(process.env.PORT, () => console.log(`Server started at port : ${process.env.PORT}`));