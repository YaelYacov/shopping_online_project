const con = require("../utils/database");
const categories = require("../models/categoriesModel");

exports.getAllCategories = async (req, res, next) => {
  await categories
    .findAll()
    .then((result) => {
      console.log(result);
      res.send(result);
    })
    .catch((err) => {
      console.log("err shoeing categories", err);
      res.send("err shoeing categories", err);
    });
};
