var mysql = require("mysql2");
const Sequelize = require("sequelize");

const sequelize = new Sequelize("shopping_online_yael", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
