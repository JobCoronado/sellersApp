const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(cors())
app.use(morgan('tiny'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(require('./routes/server.routes.js'))

app.get('/', (req, res) => {
    res.json( 'Hello Melonn Sellers' );
});
const server= app.listen(8000, () => {
    console.log('listening on port %s...', server.address().port);
});