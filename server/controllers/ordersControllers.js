const con = require("../utils/database");
const Orders = require("../models/ordersModel");
const User = require("../models/usersModel");

exports.getOrders = async (req, res, next) => {
  let condition = req.body.AllOrders == "All" ? {} : { where: { userID: req.body.userID } };
  // let condition = req.body.AllProds == "All" ? {} : { where: { CategoryID: req.body.CategoryID } };
  // console.log(req.body);
  let options = { include: User };
  await Orders.findAll(condition, options)
    .then((result) => {
      // console.log(result);
      res.send(result);
    })
    .catch((err) => {
      // console.log("err getting orders", err);
      res.send("err getting orders", err);
      // res.status(200).send("err getting orders", err);
    });
};

exports.updateOrder = async (req, res, next) => {
  let values = { OrderInPlace: req.body.OrderInPlace };
  let condition = { where: { ID: req.body.ID } };
  await Orders.update(values, condition)
    .then((result) => {
      console.log(result);
      res.send(result);
    })
    .catch((err) => {
      console.log("err updating orders", err);
      res.send("err updating orders", err);
    });
};

exports.addNewOrder = async (req, res, next) => {
  // `ID`, `TotalPrice`, `City`, `Street`, `OrderInPlace`, `LastDigitsOfCard`, `createdAt`, `updatedAt`, `userID`;
  await Orders.create({ TotalPrice: req.body.TotalPrice, City: req.body.City, Street: req.body.Street, ShippingDate: req.body.ShippingDate, LastDigitsOfCard: req.body.LastDigitsOfCard, userID: req.body.userID, OrderInPlace: true })
    .then((result) => {
      console.log(result);
      res.send(result);
    })
    .catch((err) => {
      console.log("err adding new Order", err);
      res.send("err adding new Order", err);
    });
};
