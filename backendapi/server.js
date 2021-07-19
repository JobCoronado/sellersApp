const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors')

//inicializations
const app = express();


// Setings
app.set('port', process.env.PORT || 8000);
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header( 'Access-Control-Allow-Methods', 'GET, OPTIONS, HEAD, POST, PUT, DELETE');
    next();
  });

// Midleware
app.use(bodyParser.json());
app.use(cors());


// Routes
app.use(require('./routes/orders.routes.js'))


// Static files


// Error handlers

module.exports = app;