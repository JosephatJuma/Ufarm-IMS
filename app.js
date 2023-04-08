const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
//Routes
const agricOfficerRoute = require("./Routes/agricOfficerRoute");
const farmOneRoute = require("./routes/farmerOneRoute");
const productsRoute = require("./routes/productsRoute");
const registerFoRoute = require("./routes/registerFoRoute");
const registerUfRoute = require("./routes/registerUfRoute");

//connect controller to db
mongoose.connect(config.database);
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
app.use(express.static("public"));
app.use("/admin", agricOfficerRoute);
app.use("/farmer-one", farmOneRoute);
app.use("/register-fo", registerFoRoute);
app.use("/register-uf", registerUfRoute);

app.listen(10000, "localhost", () => {
  console.log("Listening on port 10000");
  app.use("/products", productsRoute);
});
