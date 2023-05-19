const router = require('express').Router();
const { getAll, getOne } = require('../../controllers/api/usersApiController');

router
    .get('/', getAll)
    .get('/:id', getOne)

module.exports = router;