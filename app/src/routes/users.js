const express = require('express');
const router = express.Router();
const path = require('path');

const registerValidator = require("../validations/registerValidator");

const controller = require('../controllers/usersController');
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
router.get("/login", controller.login);

router.get("/register", controller.register);
router.post("/register", uploadFile.single("avatar"), registerValidator,controller.processRegister);

module.exports = router;