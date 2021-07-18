const dataOrders = require('./dataOrders.js')


function mustBeInteger(req, res, next) {
    const OrderId = req.params.OrderId

    if (!Number.isInteger(parseInt(OrderId))) {
        res.status(400).json({ message: 'ID must be an integer' })
    } else {
        next()
    }
}

function checkFieldsPost(req, res, next) {
    const  dataOrders  = req.body
    console.log(dataOrders, "here");

    if ( dataOrders ) {
        next()
    } else {
        res.status(400).json({ message: 'fields are not good' })
    }
}

module.exports = {
    mustBeInteger,
    checkFieldsPost
}