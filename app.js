const express = require("express");
const app = express();
const path = require("path");
//Routes
const agricOfficerRoute = require("./Routes/agricOfficerRoute");
const farmOneRoute = require("./Routes/farmerOneRoute");
const productsRoute = require("./Routes/productsRoute");

//Templates engine
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.get("/", (req, res) => {
  res.render("index.pug");
});
app.use(express.static("public"));
app.use("/admin", agricOfficerRoute);
app.use("/farmer-one", farmOneRoute);

app.listen(10000, "localhost", () => {
  console.log("Listening on port 10000");
  app.use("/products", productsRoute);
});
