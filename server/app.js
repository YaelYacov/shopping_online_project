const express = require("express");
const http = require("http");
const cors = require("cors");
var mysql = require("mysql2");
const bodyParser = require("body-parser");
const expressFileUpload = require("express-fileupload");
const multer = require("multer");
const path = require("path");

const Users = require("./models/usersModel");
const Categories = require("./models/categoriesModel");
const Products = require("./models/productsModel");
const Cart = require("./models/cartModel");
const Orders = require("./models/ordersModel");
const CartProduct = require("./models/productsInCartModel");

const sequelize = require("./utils/database");
const Sequelize = require("sequelize");

const app = express();

// Products.belongsToMany(Categories, { through: "products", foreignKey: "ID", sourceKey: "ID" });

// Categories.hasMany(Products);

Products.belongsTo(Categories); //, { foreignKey: "CategoryID", sourceKey: "ID" });

// Products.hasOne(CartProduct);
// Users.belongsToMany(Cart, { through: Cart });
Cart.belongsToMany(Users, { through: "UsersCART" });
// Cart.hasMany(Users);
// Users.belongsTo(Cart);
// Users.hasOne(Cart);

CartProduct.belongsTo(Cart);
// Cart.hasMany(CartProduct);

Products.hasMany(CartProduct);
CartProduct.belongsTo(Products);

Orders.belongsTo(Users);
// Cart.hasMany(Orders);

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

// app.use(function (req, res, next) {
//   // Website you wish to allow to connect
//   res.setHeader("Access-Control-Allow-Origin", "*");

//   // Request methods you wish to allow
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");

//   // Request headers you wish to allow
//   res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader("Access-Control-Allow-Credentials", true);

//   // Pass to next layer of middleware
//   next();
// });

app.use(cors(corsOptions));

const UsersRoute = require("./routes/userRoutes");
app.use("/users", UsersRoute);

const ProductsRoute = require("./routes/productsRoutes");
app.use("/products", ProductsRoute);

const CategoriesRoute = require("./routes/categoriesRoutes");
app.use("/categories", CategoriesRoute);

const CartRoute = require("./routes/cartRoutes");
app.use("/cart", CartRoute);

const ProdInCartRoute = require("./routes/prodInCartRoutes");
app.use("/prodInCart", ProdInCartRoute);

const OrdersRoute = require("./routes/ordersRoutes");
app.use("/orders", OrdersRoute);

app.use((req, res) => {
  res.send("page not found!");
});

// app.use((err, req, res) => {
//   console.error(err.stack);
//   res.status(500).send("Something broke!");
// });

//uploads file
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },

//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
//   },
// });

// var upload = multer({ storage: storage });

// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });

// app.get("/", upload.array("multi-files"), (req, res) => {
//   res.redirect("/");
// });

//uploads file

sequelize
  .sync()
  .then(() => {
    console.log(`listening on port ${5000}`);
    app.listen(5000);
  })
  .catch(function (err) {
    console.log(err);
  });
