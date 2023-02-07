const express = require("express");
const productsController = require("../controllers/productsController");
const router = express.Router();
const controller = require("../controllers/productsController");

router.get("/product/:id", controller.product); 
router.get("/cart", controller.cart); 
/* crear producto */
router.get("/products/create", productsController.create);
router.post("/products", productsController.store);
/* crear producto */

/* Editar producto */
router.get("/edit/:id/" , productsController.edit);
router.put("/edit/:id" , productsController.update);
/* Editar producto */

module.exports = router;