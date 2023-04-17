const express = require('express');
const { login, register , processRegister, processLogin } = require('../controllers/usersController');
const router = express.Router();
const path = require('path'); 
const controller = require('../controllers/usersController');
const registerValidator = require("../validations/registerValidator");
const loginValidator = require('../validations/loginValidator');
/* devuelve al inicio si el user inició sessión */
const sessionUserCheck = require('../middlewares/sessionUserCheck');
/* sigue si el use no inició sesión */
const userInSessionCheck = require('../middlewares/userInSessionCheck');



router.get('/user/', controller.user);
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


router.get('/user/:id', userInSessionCheck, controller.user);
router.put('/edit/:id', controller.editProfile);
router.get("/cart", controller.cart); 
router.get("/register", sessionUserCheck, register);
router.post("/register", uploadFile.single("avatar"), registerValidator, processRegister);


/* GET - login form */
router.get("/login", sessionUserCheck, login);
/* POST - login form */
router.post("/login", loginValidator, processLogin);

module.exports = router;