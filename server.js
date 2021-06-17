const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const flash = require("req-flash");
const dotenv = require("dotenv");
const path = require("path");
const MongoDB = require("./models/db");
const { paginate } = require("./hbsHelper");

dotenv.config({ path: ".env" });
const PORT = process.env.PORT;
MongoDB();

var app = express();
var hbs = exphbs.create({
  extname: ".hbs",
  defaultLayout: false,
  helpers: {
    paginate: paginate,
  },
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  session({
    secret: "djhxcvxfgshajfgjhgsjhfgsakjeauytsdfy",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(flash());
app.engine("hbs", hbs.engine);

app.set("view engine", "hbs");

app.use("/uploads", express.static("./uploads"));
app.use(express.static(path.join(__dirname, "./public")));

app.use("/", require("./routes/pages"));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
