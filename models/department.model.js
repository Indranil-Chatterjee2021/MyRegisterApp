//const mongoose = require('./db');
const mongoose = require("mongoose");
// Department Schema
const department = new mongoose.Schema({
  deptCode: {
    type: String,
  },
  deptName: {
    type: String,
  },
});
module.exports = mongoose.model("Department", department);
