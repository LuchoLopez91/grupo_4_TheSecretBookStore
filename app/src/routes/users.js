const express = require('express');
const router = express.Router();
const controller = require('../controllers/usersController');


router.get('/user/:id', controller.user);
router.get("/cart", controller.cart); 
router.get("/login", controller.login);
router.get("/register", controller.register);


module.exports = router;