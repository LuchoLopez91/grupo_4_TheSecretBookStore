const express = require('express');
const router = express.Router();
const controller = require('../controllers/mainController');
//const adminAccess = require('../middlewares/adminAccess');



router.get("/", controller.index);
router.get("/home", controller.index);
router.get("/search", controller.search); 
//router.get('/admin', adminAccess, controller.admin);


module.exports = router;