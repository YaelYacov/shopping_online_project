const express = require("express");
const router = express.Router();
const categoriesControllers = require("../controllers/categoriesControllers");

router.post("/getAllCategories", categoriesControllers.getAllCategories);
router.post("/addNewCat", categoriesControllers.addNewCat);

module.exports = router;
