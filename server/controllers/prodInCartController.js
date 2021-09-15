const con = require("../utils/database");
const productInCart = require("../models/productsInCartModel");
const Product = require("../models/productsModel");

exports.getProdInCartByCartID = async (req, res, next) => {
  let AllOrCartProds = req.body.AllOrCartProds;
  let attributes = ["ID", "Name", "description", "Price", "Img"];
  //   let options = { include: [{ model: [Product], attribute: attributes }] };
  let options = { include: [{ model: Product, attributes: attributes }] };
  let condition = AllOrCartProds == "All" ? {} : { where: { CartID: req.body.CartID }, include: [{ model: Product, attributes: attributes }] };
  // ({ include: [Actions],

  await productInCart
    .findAll(condition)
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
  let values = req.body.values;
  console.log("valuesssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss", values);

  await productInCart

    .create(values)
    // .create({ Qnt: req.body.Qnt, TotalPrice: req.body.TotalPrice, CartID: req.body.CartID, ProductID: req.body.ProductID })
    .then((result) => {
      console.log(result);
      console.log("valuesssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss", values);
      res.send(result);
    })
    .catch((err) => {
      console.log("valuesssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss", values);

      console.log("err adding new products in cart", err);
      res.send("err adding new products in cart", err);
    });
};

exports.updateProdInCart = async (req, res, next) => {
  let values = { Qnt: req.body.Qnt };
  let condition = { where: { ID: req.body.ID } };

  await productInCart
    .update(values, condition)
    .then((result) => {
      console.log(result);
      res.send(result);
    })
    .catch((err) => {
      console.log("err getting Products in cart", err);
      res.send("err getting Products in cart", err);
    });
};

// `ID`, `Qnt`, `TotalPrice`, `createdAt`, `updatedAt`, `CartID`, `ProductID`;
