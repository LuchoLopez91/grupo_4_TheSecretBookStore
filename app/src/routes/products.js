const express = require("express");
const productsController = require("../controllers/productsController");
const router = express.Router();
const controller = require("../controllers/productsController");

router.get("/details/:id", controller.product); 
/* crear producto */
router.get("/create", productsController.create);
router.post("/create", productsController.store);
/* crear producto */

/* Editar producto */
router.get("/edit/:id" , productsController.edit);
router.put("/edit/:id" , productsController.update);

/* Quemar libro */
router.delete("delete/:id", productsController.burn)

module.exports = router;