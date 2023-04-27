const express = require("express");
const {
    list,
    bookDetail,
    booksByGenres,
    addNewBook,
    store,
    edit,
    update,
    erase,
    burn,
} = require("../controllers/productsController");
const path = require ("path");
const router = express.Router();
const multer = require ("multer");
const adminCheck = require('../middlewares/adminCheck')
const productValidator = require("../validations/productValidator");


const storage = multer.diskStorage(
    {
        destination: function (req, file, cb){
            cb(null,"./public/images/books");
        },
        filename: function(req, file, cb){
            cb(null, `${Date.now()}_cover_${path.extname(file.originalname)}`);
        }
    })
const uploadFile = multer({storage});


router.get('/category/:id', booksByGenres);

router.get("/", list);
router.get("/details/:id", bookDetail);

/* crear producto */
//router.get('/product-create-form/add', add)
router.get('/create', addNewBook);
//router.get('/product-create-form/create', productValidator,  create)
//router.get("/create", adminCheck, create);
router.post("/create", uploadFile.single("image"), store);
/* crear producto */

/* Editar producto */
router.get("/edit/:id", edit);
router.put("/edit/:id", uploadFile.single("cover"), update);

/* Quemar libro */
router.delete("/delete/:id", adminCheck, burn)

module.exports = router;