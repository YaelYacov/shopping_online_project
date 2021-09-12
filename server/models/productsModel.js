const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utils/database");
const Products = sequelize.define("Products", {
  ID: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  Name: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  // CategoryId: {
  //   type: Sequelize.INTEGER(11),
  //   allowNull: false,
  //   foreignKey: true,
  // },
  Price: {
    type: DataTypes.FLOAT(11),
    allowNull: false,
  },
  Img: {
    type: Sequelize.STRING(50),
  },
  description: {
    type: Sequelize.STRING(50),
    allowNull: true,
  },
});

module.exports = Products;
