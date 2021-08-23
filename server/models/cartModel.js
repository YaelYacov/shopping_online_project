const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utils/database");
const Cart = sequelize.define("Cart", {
  ID: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  // UserId: {
  //   type: Sequelize.INTEGER(11),
  //   foreignKey: true,
  // },
  Status: {
    type: Sequelize.INTEGER(11),
    defaultValue: true,
  },
});

module.exports = Cart;
