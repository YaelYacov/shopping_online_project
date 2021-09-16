const con = require("../utils/database");
const Cart = require("../models/cartModel");
const User = require("../models/usersModel");

exports.getCartByID = async (req, res, next) => {
  let attributes = ["ID"];
  // let condition = req.body.AllProds == "All" ? {} : { where: { CategoryID: req.body.CategoryID } };
  // let options = { include: [{ model: categories, attributes: attributes }] };
  let condition = req.body.AllCarts == "All" ? {} : { where: req.body.userID ? { userID: req.body.userID, Status: req.body.Status } : { ID: req.body.ID, Status: req.body.Status } };
  // let options = { include: [{ model: Users }] };

  await Cart.findAll(condition)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log("err shoeing cart", err);
      res.send("err shoeing cart", err);
    });
};

exports.addNewCart = async (req, res, next) => {
  // models.Page.update(values, condition, options);
  let values = req.body.values;
  let Result;

  await Cart.create(values)
    .then((result) => {
      Result = result;
      res.send(result);
    })
    .catch((err) => {
      console.log("err adding new cart", err);
      res.send("err adding new cart", err);
    });
  // console.log("resulttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt", Result);
  if (Result && Result.ID) {
    await User.update({ CartID: Result.ID }, { where: { ID: Result.userID } })
      .then((result) => {
        // console.log(result);
        // res.send(result);
      })
      .catch((err) => {
        console.log("err getting all users", err);
        // res.send("err getting all users", err);
      });
  }
};

exports.updateCartStatus = async (req, res, next) => {
  let values = { Status: req.body.Status };
  let condition = { where: { ID: req.body.ID } };

  await Cart.update(values, condition)
    .then((result) => {
      console.log(result);
      res.send(result);
    })
    .catch((err) => {
      console.log("err updating cart status", err);
      res.send("err updating cart status", err);
    });
};
