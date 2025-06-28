const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const port = process.env.PORT || 4000;
//configure express-session
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "seceret-key",
    resave: false,
    saveUninitialized: true,
  })
);

//require("dotenv").config();
//db configuration file
const config = require("./config/database");

//Routes
const dashboard = require("./api-routes/dashbordRoute");
const wardsRoute = require("./api-routes/wardsRoute");
const productsRoute = require("./api-routes/productsRoute");
const registerFoRoute = require("./api-routes/registerFoRoute");
const registerUfRoute = require("./api-routes/registerUfRoute");
const registerRoute = require("./api-routes/clientRegisterRoute");
const loginRoute = require("./api-routes/loginRoute");
const logout = require("./api-routes/logout");
const allFarmerOnesRoute = require("./api-routes/allfarmerOnes");
const addProductRoute = require("./api-routes/addProductRoute");
const successRoute = require("./api-routes/successRoute");
const api = require("./api-routes/apiRoutes");

//connect controller to db
mongoose.connect(config.database, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
try {
  db.once("open", () => {
    console.log("connected to db");
  });
} catch (error) {
  console.log("Error");
}

db.on("error", (err) => {
  console.log(console.log(err));
});
app.use(bodyParser.urlencoded({ extended: true })); //allow body-parser

//Template engine
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

//public route
app.get("/", (req, res) => {
  res.render("index.pug", { page: "home" });
});

//other routes
app.use(express.static(path.join(__dirname, "public"))); //set public dir for assests
app.use("/admin", dashboard);
app.use("/wards", wardsRoute);
app.use("/register/fo", registerFoRoute);
app.use("/register/uf", registerUfRoute);
app.use("/list", allFarmerOnesRoute);
app.use("/login", loginRoute);
app.use("/logout", logout);
app.use("/register", registerRoute);
app.use("/add-product", addProductRoute);
app.use("/success", successRoute);
app.use("/api", api);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
  app.use("/products", productsRoute);
});
