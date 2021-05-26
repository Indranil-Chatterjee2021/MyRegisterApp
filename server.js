const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const MongoDB = require("./models/db");

dotenv.config({ path: ".env" });
const PORT = process.env.PORT;
MongoDB();

var app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set("view engine", "hbs");

app.use("/", require("./routes/pages"));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
// app.listen(process.env.PORT, (err) => {
//   if (err) console.log("Unable to start Server..");
//   else console.log(`Server Started Successfully at Port : ${PORT}`);
// });
