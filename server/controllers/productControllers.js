const con = require("../utils/database");
const products = require("../models/productsModel");
const categories = require("../models/categoriesModel");

exports.getAllProducts = async (req, res, next) => {
  let attributes = ["Name"];
  let condition = req.body.AllProds == "All" ? {} : { where: { CategoryID: req.body.CategoryID, Deleted: 1 } };
  let options = { include: [{ model: categories, attributes: attributes }] };
  // console.log("condition", condition);

  await products
    .findAll(condition, options)
    // .findAll(condition, options)
    .then((result) => {
      // console.log(req.body.CategoryID);
      res.send(result);
    })
    .catch((err) => {
      // console.log("err shoeing products", err);
      // console.log(req.body == true);
      res.send(err);
    });
};

exports.addNewProd = async (req, res, next) => {
  await products
    .create({ Name: req.body.Name, Price: req.body.Price, CategoryID: req.body.CategoryID })
    .then((result) => {
      console.log(result);
      res.send(result);
    })
    .catch((err) => {
      console.log("err adding new products", err);
      res.send("err adding new products", err);
    });
};

exports.editProd = async (req, res, next) => {
  let values = req.body.editCol;
  let condition = { where: { ID: req.body.ID } };
  await products
    .update(values, condition)
    .then((result) => {
      console.log(result);
      res.send(result);
    })
    .catch((err) => {
      console.log("err editing new products", err);
      res.send("err editing new products", err);
    });
};

// update;
// { categories }
