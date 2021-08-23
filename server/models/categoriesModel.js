const { Sequelize } = require("sequelize");
const sequelize = require("../utils/database");

const Categories = sequelize.define("Categories", {
  ID: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  Name: {
    type: Sequelize.STRING(50),
    unique: true,
  },
});

module.exports = Categories;
