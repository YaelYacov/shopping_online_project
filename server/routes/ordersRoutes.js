const express = require("express");
const router = express.Router();
const ordersControllers = require("../controllers/ordersControllers");

router.post("/getOrders", ordersControllers.getOrders);
router.post("/updateOrder", ordersControllers.updateOrder);
router.post("/addNewOrder", ordersControllers.addNewOrder);

module.exports = router;
