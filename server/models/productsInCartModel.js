const { Sequelize } = require("sequelize");
const sequelize = require("../utils/database");
const ProductsInCart = sequelize.define(
  "ProductsInCart",
  {
    ID: {
      type: Sequelize.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    // ProductID: {
    //   type: Sequelize.INTEGER(11),
    //   foreignKey: true,
    // },
    CartId: {
      type: Sequelize.INTEGER(11),
      foreignKey: true,
    },
    // Product: {
    //   type: Sequelize.INTEGER(11),
    //   foreignKey: true,
    // },
    Qnt: {
      type: Sequelize.INTEGER(11),
      defaultValue: 1,
    },
    TotalPrice: {
      type: Sequelize.INTEGER(11),
    },
  },
  { timestamps: true }
);

module.exports = ProductsInCart;
