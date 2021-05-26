const mongoose = require("mongoose");

//mongoose.connect('mongodb://localhost:27017/EmployeeDB'
mongoose.connect(
  "mongodb+srv://indra:indra@1234@employeedb.mggmp.mongodb.net/EmpDatabase?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  (err) => {
    if (!err) {
      console.log("Successfully Established Connection with MongoDB");
    } else {
      console.log(
        "Failed to Establish Connection with MongoDB with Error: " + err
      );
    }
  }
);
module.exports = mongoose;
