const express = require("express");
const productsController = require("../controllers/productsController");
const router = express.Router();
const controller = require("../controllers/productsController");

router.get("/product/:id", controller.product); 
router.get("/cart", controller.cart); 
/* crear producto */
router.get("/products/create", productsController.create);
//router.post("/products", productsController.store);
/* crear producto */

/* Editar producto */
router.get("/product/:id/edit" , productsController.edit);
//router.put("/:id" , productsController.update);

module.exports = router;