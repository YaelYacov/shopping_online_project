const express = require("express");
const router = express.Router();
const prodInCartControllers = require("../controllers/prodInCartController");

router.post("/getProdInCartByCartID", prodInCartControllers.getProdInCartByCartID);
router.post("/addNewProdInCart", prodInCartControllers.addNewProdInCart);
module.exports = router;
