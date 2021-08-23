const express = require("express");
const router = express.Router();
const productsControllers = require("../controllers/productControllers");

// router.post()
router.post("/getAllProducts", productsControllers.getAllProducts);
router.post("/addNewProd", productsControllers.addNewProd);
router.post("/editProd", productsControllers.editProd);

module.exports = router;
