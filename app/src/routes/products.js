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
const adminCheck = require('../middlewares/adminCheck')
const productValidator = require("../validations/productValidator");
const uploadCover = require('../middlewares/uploadCover')
const bookVisitsCount = require('../middlewares/bookVisitsCount')




router.get('/category/:id', booksByGenres);

router.get("/", list);
router.get("/details/:id", bookVisitsCount, bookDetail);

/* crear producto */
//router.get('/product-create-form/add', add)
router.get('/create', adminCheck, addNewBook);
//router.get('/product-create-form/create', productValidator,  create)
//router.get("/create", adminCheck, create);
router.post("/create", uploadCover.single("cover"), productValidator ,store);
/* crear producto */

/* Editar producto */
router.get("/edit/:id", adminCheck, edit);
router.put("/edit/:id", uploadCover.single("cover"), productValidator, update);

/* Quemar libro */
router.delete("/delete/:id", adminCheck, burn)

module.exports = router;