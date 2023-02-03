const express = require('express');
const router = express.Router();
const controller = require('../controllers/mainController');



router.get("/", controller.index);
router.get("/home", controller.index);


module.exports = router;