const con = require("../utils/database");
const products = require("../models/productsModel");
const categories = require("../models/categoriesModel");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

exports.getAllProducts = async (req, res, next) => {
  let attributes = ["Name"];
  let condition = req.body.AllProds == "All" ? {} : { where: { CategoryID: req.body.CategoryID } };
  let options = { include: [{ model: categories, attributes: attributes }] };

  await products
    .findAll(condition, options)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.getProdByName = async (req, res, next) => {
  await products
    .findAll({
      where: {
        Name: {
          [Op.like]: `%${req.body.Name}%`,
        },
      },
    })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.addNewProd = async (req, res, next) => {
  await products
    .create({ Name: req.body.Name, description: req.body.description, Img: req.body.Img, Price: req.body.Price, CategoryID: req.body.CategoryID })
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
