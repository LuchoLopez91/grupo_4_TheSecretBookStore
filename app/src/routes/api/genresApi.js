const router = require('express').Router();
const { getAll, getOne, addOne, modifyOne, removeOne } = require('../../controllers/api/genresApiController');

router
.get('/', getAll)
.get('/:id', getOne)
.post('/', addOne)
.put('/:id', modifyOne)
.delete('/:id', removeOne)

module.exports = router;