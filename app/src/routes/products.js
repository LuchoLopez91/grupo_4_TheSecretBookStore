const express = require("express");
const productsController = require("../controllers/productsController");
const path = require ("path");
const router = express.Router();
const multer = require ("multer");
const adminCheck = require('../middlewares/adminCheck')

const storage = multer.diskStorage(
    {
        destination: function (req, file, cb){
            cb(null,"./public/images/books");
        },
        filename: function(req, file, cb){
            cb(null, file.originalname );
        }
    })

    const uploadFile = multer({storage});

const controller = require("../controllers/productsController");

router.get('/category/:category', controller.booksByGenres);

router.get("/", controller.list);
router.get("/details/:id", controller.product); 

/* crear producto */
router.get("/create", adminCheck, productsController.create);
router.post("/create", uploadFile.single("image"), productsController.store);
/* crear producto */

/* Editar producto */
router.get("/edit/:id", adminCheck, productsController.edit);
router.put("/edit/:id", uploadFile.single("image"), productsController.update);

/* Quemar libro */
router.delete("/delete/:id", adminCheck, productsController.burn)

module.exports = router;