const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utils/database");
const Orders = sequelize.define("Orders", {
  ID: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  TotalPrice: {
    type: Sequelize.INTEGER(11),
  },
  City: {
    type: Sequelize.STRING(50),
  },
  Street: {
    type: Sequelize.STRING(50),
  },
  LastDigitsOfCard: {
    type: Sequelize.STRING(4),
    allowNull: false,
  },
  ShippingDate: {
    type: Sequelize.STRING(11),
    allowNull: false,
  },
});

module.exports = Orders;
