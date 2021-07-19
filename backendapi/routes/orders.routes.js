const { Router } = require("express");
const router = Router();

const {
    getOrders,
    getOrder,
    addOrder,
} = require('../controllers/ordersController');


router.get('/api/v1/orders',getOrders);

router.get('/api/v1/order/:key',getOrder)

router.post('/api/v1/orders', addOrder);



module.exports = router;
