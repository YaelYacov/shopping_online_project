const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utils/database");
const Users = sequelize.define("users", {
  ID: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },

  Fname: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  Lname: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  Mail: {
    type: Sequelize.STRING(50),
    allowNull: false,
    unique: true,
  },
  Password: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  Identification: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    unique: true,
  },
  City: {
    type: Sequelize.STRING(50),
  },
  Street: {
    type: Sequelize.STRING(50),
  },
  IsAdmin: {
    type: Sequelize.BOOLEAN(),
    defaultValue: false,
  },

  CartID: {
    type: Sequelize.INTEGER(11),
    foreignKey: true,
    allowNull: true,
  },
});

module.exports = Users;
