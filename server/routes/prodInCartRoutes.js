const express = require("express");
const router = express.Router();
const prodInCartControllers = require("../controllers/prodInCartController");

router.post("/getProdInCartByCartID", prodInCartControllers.getProdInCartByCartID);
router.post("/addNewProdInCart", prodInCartControllers.addNewProdInCart);
router.post("/updateProdInCart", prodInCartControllers.updateProdInCart);
module.exports = router;
