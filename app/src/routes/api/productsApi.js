const router = require('express').Router();
const { getBooks, getBookById } = require('../../controllers/api/productsApiControllers');

router
    .get('/api/products', getBooks)
    .get('/api/product/:id', getBookById)

module.exports = router;