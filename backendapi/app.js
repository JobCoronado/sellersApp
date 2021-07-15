const express = require('express');
const cors = require('cors');
const ordersRoutes = require('./routes/orders.routes.js');
const { json } = require('express');

const app = express();

app.use(cors());
app.use(json());



app.use('/orders', ordersRoutes);

module.exports = app;