const express = require("express");
const app = express();
//Routes
const agricOfficerRoute = require("./Routes/agricOfficerRoute");
const farmOneRoute = require("./Routes/farmerOneRoute");

app.get("/", (req, res) => {
  res.send("Hello public");
});
app.use("/admin", agricOfficerRoute);
app.use("/farmer-one", farmOneRoute);

app.listen(10000, "localhost", () => {
  console.log("Listening on port 10000");
});
