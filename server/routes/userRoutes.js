const express = require("express");
const router = express.Router();
const usersControllers = require("../controllers/userControllers");

router.post("/getUserByMailNPass", usersControllers.getUserByMailNPass);
router.post("/createNewUser", usersControllers.createNewUser);
router.get("/getAllUsers", usersControllers.getAllUsers);
router.post("/updateUserCart", usersControllers.updateUserCart);
// router.post("/updateUserCart", usersController.updateUserCart);

module.exports = router;
