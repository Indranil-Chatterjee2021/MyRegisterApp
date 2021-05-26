const mongoose = require("./db");
// Employee Schema
var employee = new mongoose.Schema({
    empCode: {
        type:String
    },
    empName: {
        type: String
    },
    Mobile: {
        type: String
    },
    Salary: {
        type:String
    },
    department: {
        type: String
    }
})
module.exports = mongoose.model('Employee',employee);
