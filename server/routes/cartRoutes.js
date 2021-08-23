const express = require("express");
const router = express.Router();
const cartsControllers = require("../controllers/cartControllers");

// router.post()
router.post("/addNewCart", cartsControllers.addNewCart);
router.post("/getCartByID", cartsControllers.getCartByID);
router.post("/updateCartStatus", cartsControllers.updateCartStatus);
// router.post("/editProd", cartsControllers.editProd);

module.exports = router;
