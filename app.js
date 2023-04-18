const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
//require("dotenv").config();
const config = require("./config/database");
//Routes
const agricOfficerRoute = require("./Routes/agricOfficerRoute");
const farmOneRoute = require("./routes/farmerOneRoute");
const productsRoute = require("./routes/productsRoute");
const registerFoRoute = require("./routes/registerFoRoute");
const registerUfRoute = require("./routes/registerUfRoute");
const registerRoute = require("./routes/registerRoute");
const loginRoute = require("./routes/loginRoute");
const allFarmerOnesRoute = require("./routes/allfarmerOnes");
const addProductRoute = require("./routes/addProductRoute");
//connect controller to db
mongoose.connect(config.database, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.once("open", () => {
  console.log("connected to db");
});

db.on("error", (err) => {
  console.log(console.log(err));
});
app.use(bodyParser.urlencoded({ extended: true })); //allow body-parser

//Templates engine
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.get("/", (req, res) => {
  res.render("index.pug");
});
app.use(express.static(path.join(__dirname, "public")));
app.use("/admin", agricOfficerRoute);
app.use("/farmer-one", farmOneRoute);
app.use("/register/fo", registerFoRoute);
app.use("/register/uf", registerUfRoute);
app.use("/list/fo", allFarmerOnesRoute);
app.use("/login", loginRoute);
app.use("/register", registerRoute);
app.use("/add-product", addProductRoute);
app.listen(10000, "localhost", () => {
  console.log("Listening on port 10000");
  app.use("/products", productsRoute);
});
