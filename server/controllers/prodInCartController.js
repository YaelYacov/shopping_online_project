const con = require("../utils/database");
const productInCart = require("../models/productsInCartModel");
const Product = require("../models/productsModel");

exports.getProdInCartByCartID = async (req, res, next) => {
  let AllOrCartProds = req.body.AllOrCartProds;
  let condition = AllOrCartProds == "All" ? { where: null } : { where: { CartID: req.body.CartID } };
  let options = { include: [{ model: Product }] };

  await productInCart
    .findAll(condition, options)
    .then((result) => {
      console.log(result);
      res.send(result);
    })
    .catch((err) => {
      console.log("err getting product in cart", err);
      res.send("err getting product in cart", err);
    });
};

exports.addNewProdInCart = async (req, res, next) => {
  await productInCart
    .create({ Qnt: req.body.Qnt, TotalPrice: req.body.TotalPrice, CartID: req.body.CartID, ProductID: req.body.ProductID })
    .then((result) => {
      console.log(result);
      res.send(result);
    })
    .catch((err) => {
      console.log("err adding new products in cart", err);
      res.send("err adding new products in cart", err);
    });
};

// `ID`, `Qnt`, `TotalPrice`, `createdAt`, `updatedAt`, `CartID`, `ProductID`;
