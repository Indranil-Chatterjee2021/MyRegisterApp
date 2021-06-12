const mongoose = require("mongoose");

var empDetail = new mongoose.Schema({
  address: {
    type: String,
  },
  mobile: {
    type: Number,
    pattern: "^([0-9]{3}-[0-9]{3}-[0-9]{4}$",
    //required: true,
    unique: true,
    //dropDups: true,
  },
  emp_id: {
    type: Number,
    ref: "Employee",
  },
  createdAt: {
    type: String,
  },
  lastModified: {
    type: String,
  },
});
module.exports = mongoose.model("EmpDetail", empDetail);
