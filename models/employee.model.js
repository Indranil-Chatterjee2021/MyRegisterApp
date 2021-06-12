//const mongoose = require("./db");
const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
// Employee Schema
var employee = new mongoose.Schema(
  {
    _id: Number,
    empName: {
      type: String,
      required: true,
    },
    salary: {
      type: String,
      //required: true,
    },
    email: {
      type: String,
      format: "email",
      required: true,
      unique: true,
    },
    dept_id: {
      type: mongoose.Schema.Types.String,
      ref: "Department",
    },
    createdAt: {
      type: String,
    },
    lastModified: {
      type: String,
    },
  },
  { _id: false }
);

//employee.plugin(AutoIncrement, { inc_field: "_id" }, { start_seq: 10001 });
employee.plugin(AutoIncrement, { start_seq: 10001 });
module.exports = mongoose.model("Employee", employee);
