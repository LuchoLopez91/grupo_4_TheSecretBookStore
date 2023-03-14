const express = require('express');
const { login, register , processLogin } = require('../controllers/usersController');
const router = express.Router();
const path = require('path');

const registerValidator = require("../validations/registerValidator");

const controller = require('../controllers/usersController');
const loginValidator = require('../validations/loginValidator')

router.get('/user/:id', controller.user);
router.get("/cart", controller.cart); 

router.get("/register", register);
const multer = require("multer");


const storage = multer.diskStorage(
    {
        destination: function (req, file, cb){
            cb(null,"./public/images/avatars");
        },
        filename: function(req, file, cb){
            let filename = `${Date.now()}_img${path.extname(file.originalname)}`
            cb(null, filename );
        }
    })

    const uploadFile = multer({storage});


router.get('/user/:id', controller.user);
router.get("/cart", controller.cart); 


router.get("/register", controller.register);
router.post("/register", uploadFile.single("avatar"), registerValidator,controller.processRegister);

/* GET - login form */
router.get("/login", login);
/* GET - login form */
router.post("/login", loginValidator, processLogin);
module.exports = router;