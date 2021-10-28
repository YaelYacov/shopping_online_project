const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utils/database");
const Cart = sequelize.define(
  "Cart",
  {
    ID: {
      type: Sequelize.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    // orderID: {
    //   type: Sequelize.INTEGER(11),
    //   foreignKey: true,
    // },
    Status: {
      type: Sequelize.INTEGER(11),
      defaultValue: 0,
    },
  }
  // { timestamps: false }
);

module.exports = Cart;
