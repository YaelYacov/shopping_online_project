const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utils/database");
const Cart = sequelize.define("Cart", {
  ID: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
});

module.exports = Cart;
