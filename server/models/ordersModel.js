const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utils/database");
const Orders = sequelize.define("Orders", {
  ID: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  // UserID: {
  //   type: Sequelize.INTEGER(11),
  //   foreignKey: true,
  // },
  TotalPrice: {
    type: Sequelize.INTEGER(11),
  },
  City: {
    type: Sequelize.STRING(50),
  },
  Street: {
    type: Sequelize.STRING(50),
  },
  OrderInPlace: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
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
