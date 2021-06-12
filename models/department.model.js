//const mongoose = require('./db');
const mongoose = require("mongoose");
// Department Schema
const department = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  deptName: {
    type: String,
    required: true,
    unique: true,
    //dropDups: true,
  },
  createdAt: {
    type: String,
  },
  lastModified: {
    type: String,
  },
});
module.exports = mongoose.model("Department", department);
