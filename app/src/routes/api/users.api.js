const router = require('express').Router();
const { getAll, getOne } = require('../../controllers/api/users.api.controller');

router
    .get('/', getAll)
    .get('/:id', getOne)

module.exports = router;