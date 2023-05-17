const express = require('express');
const {
    profile,
    login,
    logout,
    register,
    processRegister,
    processLogin,
    cart,
    editProfile,
    updateProfile
} = require('../controllers/usersController');
const router = express.Router();
const path = require('path');
const registerValidator = require("../validations/registerValidator");
const loginValidator = require('../validations/loginValidator');
const updateUserValidator = require ('../validations/updateUserValidator')
/* devuelve al inicio si el user inició sessión */
const sessionUserCheck = require('../middlewares/sessionUserCheck');
/* sigue si el use no inició sesión */
const userInSessionCheck = require('../middlewares/userInSessionCheck');
// middleware de subir avatar
const uploadAvatar = require("../middlewares/uploadAvatar")




/* GET - profile */
router.get('/profile', userInSessionCheck, profile);

/*GET - edit Profile */
router.get('/profile/edit', userInSessionCheck, editProfile);
/* PUT - update Profile*/
router.put("/profile/edit", uploadAvatar.single("avatar"), updateUserValidator, updateProfile);



/* GET - cart */
router.get("/cart", cart);
/* GET - register form */
router.get("/register", sessionUserCheck, register);
/* POST - register form */
router.post("/register", uploadAvatar.single("avatar"), registerValidator, processRegister);


/* GET - login form */
router.get("/login", sessionUserCheck, login);
/* POST - login form */
router.post("/login", loginValidator, processLogin);

router.get("/logout", logout);

module.exports = router;