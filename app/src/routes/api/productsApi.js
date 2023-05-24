const router = require('express').Router();
const { getBooks, getBookById } = require('../../controllers/api/productsApiControllers');

router
    .get('/', getBooks)
    .get('/:id', getBookById)

module.exports = router;