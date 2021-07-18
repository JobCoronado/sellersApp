const dataOrders = require('./dataOrders.js')


function mustBeInteger(req, res, next) {
    const OrderId = req.params.OrderId

    if (Number.isInteger(OrderId)) {
        res.status(400).json({ message: 'ID must be an integer' })
    } else {
        next()
    }
}

function checkFieldsPost(req, res, next) {
    const  dataOrders  = req.body
    

    if ( dataOrders ) {
        next()
        // console.log("aqui es", dataOrders, "the data" )
    } else {
        res.status(400).json({ message: 'fields are not good' })
    }
}

module.exports = {
    mustBeInteger,
    checkFieldsPost
}