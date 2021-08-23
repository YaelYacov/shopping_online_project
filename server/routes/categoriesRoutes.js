const express = require("express");
const router = express.Router();
const categoriesControllers = require("../controllers/categoriesControllers");

// router.post("/getAllProducts", categoriesControllers.getAllProducts);
router.post("/getAllCategories", categoriesControllers.getAllCategories);

module.exports = router;
