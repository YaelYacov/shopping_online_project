const con = require("../utils/database");
const Cart = require("../models/cartModel");

exports.getCartByID = async (req, res, next) => {
  // let onlyActiveCarts = req.body
  // let condition = req.body.AllCarts == "All" ? {} : { where: { ID: req.body.ID } };
  let condition = req.body.AllCarts == "All" ? {} : { where: { ID: req.body.ID } };

  await Cart.findAll(condition)
    .then((result) => {
      // console.log(result);
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

  await Cart.create(values)
    .then((result) => {
      console.log(result);
      res.send(result);
    })
    .catch((err) => {
      console.log("err adding new cart", err);
      res.send("err adding new cart", err);
    });
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
