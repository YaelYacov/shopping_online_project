const { Sequelize } = require("sequelize");
const sequelize = require("../utils/database");
const ProductsInCart = sequelize.define("ProductsInCart", {
  ID: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  Qnt: {
    type: Sequelize.INTEGER(11),
    defaultValue: 1,
  },
  TotalPrice: {
    type: Sequelize.INTEGER(11),
  },
  Deleted: {
    type: Sequelize.INTEGER(11),
    defaultValue: 1,
  },
});

module.exports = ProductsInCart;
