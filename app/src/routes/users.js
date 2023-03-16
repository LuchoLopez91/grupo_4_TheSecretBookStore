const express = require('express');
const { login, register , processRegister, processLogin } = require('../controllers/usersController');
const router = express.Router();
const path = require('path'); 
const controller = require('../controllers/usersController');
const registerValidator = require("../validations/registerValidator");
const loginValidator = require('../validations/loginValidator')



router.get('/user/:id', controller.user);
router.get("/cart", controller.cart); 


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


router.get("/register", register);
router.post("/register", uploadFile.single("avatar"), registerValidator, processRegister);

/* GET - login form */
router.get("/login", login);
/* POST - login form */
router.post("/login", loginValidator, processLogin);

module.exports = router;