const express = require('express');
const { login, register , processLogin } = require('../controllers/usersController');
const router = express.Router();
const controller = require('../controllers/usersController');
const loginValidator = require('../validations/loginValidator')

router.get('/user/:id', controller.user);
router.get("/cart", controller.cart); 
router.post("/login", loginValidator, processLogin)
router.get("/register", register);

/* GET - login form */
router.get("/login", login);
/* GET - login form */
router.post("/login", loginValidator, processLogin);
module.exports = router;