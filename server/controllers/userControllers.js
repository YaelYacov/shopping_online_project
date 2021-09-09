const con = require("../utils/database");
const User = require("../models/usersModel");
const Cart = require("../models/cartModel");

exports.getUserByMailNPass = async (req, res, next) => {
  let condition = {
    where: {
      Mail: req.body.Mail,
      Password: req.body.Password,
    },
  };

  // let options = { include: Cart };
  let options = { include: [{ model: Cart }] };
  await User.findOne(condition, options)
    .then((result) => {
      console.log(result);
      res.send(result);
    })
    .catch((err) => {
      console.log("err shoeing user", err);
      res.send("err shoeing user", err);
    });
};

exports.getAllUsers = async (req, res, next) => {
  await User.findAll({})
    .then((result) => {
      console.log(result);
      res.send(result);
    })
    .catch((err) => {
      console.log("err getting all users", err);
      res.send("err getting all users", err);
    });
};

exports.createNewUser = async (req, res, next) => {
  let values = req.body;
  await User.create(values)
    .then((result) => {
      console.log(result);
      res.send(result);
    })
    .catch((err) => {
      console.log("err adding new user", err);
      res.send("err adding new user", err);
    });
};

exports.updateUserCart = async (req, res, next) => {
  let values = { values: req.body.values };
  let condition = { where: { ID: req.body.ID } };

  await User.update(values, condition)
    .then((result) => {
      console.log(result);
      res.send(result);
    })
    .catch((err) => {
      console.log("err getting all users", err);
      res.send("err getting all users", err);
    });
};

// {"ID":1,"Fname":"Yoshi","Lname":"Yosh","Mail":"yoshi@gmail.com ","Password":"111","Identification":258963214,"City":"Bnei Brak","Street":"Yonatan","IsAdmin":false,"createdAt":null,"updatedAt":null}
