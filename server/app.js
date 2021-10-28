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

Products.belongsTo(Categories);
Users.hasMany(Cart);
Cart.belongsTo(Users);
CartProduct.belongsTo(Cart);
Products.hasMany(CartProduct);
CartProduct.belongsTo(Products);
Orders.belongsTo(Users);
Orders.belongsTo(Cart);

app.use(express.static(path.join(__dirname, "uploads")));

let storage = multer.diskStorage({
  // destination
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

let upload = multer({ storage: storage });

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

app.post("/upload", upload.array("uploads[]", 12), (req, res) => {
  console.log("files", req.files);
  res.send(req.files);
});

app.use((req, res) => {
  res.send("page not found!");
});

sequelize
  .sync()
  .then(() => {
    console.log(`listening on port ${5000}`);
    app.listen(5000);
  })
  .catch(function (err) {
    console.log(err);
  });
