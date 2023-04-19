const express = require('express');
const {
    profile,
    login,
    register,
    processRegister,
    processLogin,
    cart,
    editProfile,
} = require('../controllers/usersController');
const router = express.Router();
const path = require('path');
const registerValidator = require("../validations/registerValidator");
const loginValidator = require('../validations/loginValidator');
/* devuelve al inicio si el user inició sessión */
const sessionUserCheck = require('../middlewares/sessionUserCheck');
/* sigue si el use no inició sesión */
const userInSessionCheck = require('../middlewares/userInSessionCheck');

const multer = require("multer");

const storage = multer.diskStorage(
    {
        destination: function (req, file, cb) {
            cb(null, "./public/images/avatars");
        },
        filename: function (req, file, cb) {
            let filename = `${Date.now()}_img${path.extname(file.originalname)}`
            cb(null, filename);
        }
    })

const uploadFile = multer({ storage });



/* GET - profile */
router.get('/profile', userInSessionCheck, profile);
/*PUT - edit profile */
router.put('/edit/:id', editProfile);

/* GET - cart */
router.get("/cart", cart);
/* GET - register form */
router.get("/register", sessionUserCheck, register);
/* POST - register form */
router.post("/register", uploadFile.single("avatar"), registerValidator, processRegister);


/* GET - login form */
router.get("/login", sessionUserCheck, login);
/* POST - login form */
router.post("/login", loginValidator, processLogin);

module.exports = router;