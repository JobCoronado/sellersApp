const { Router } = require('express');

const router = Router();

router.get('/allorders');
router.get('/:id');
router.post('/');

module.exports = router;