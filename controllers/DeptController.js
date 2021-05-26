const Department = require("../models/department.model");

exports.loadDept = (req,res) => {
  res.render("department", {
    viewTitle: "Add Department"
  });
};
exports.departmentNames = function(){
  Department.find({},{_id:0,deptName:1},(err,docs) => {
      if(!err){
          console.log(docs);
     }
     return docs;
  });
};
exports.create = (req,res) => {

    if(!req.body){
        return res.status(400).send({
            message: "Required field can not be empty",
        })
    }

    const department = new Department({
        deptCode : req.body.deptCode,
        deptName : req.body.deptname,
    });

    department
    .save()
    .then((data) => {
      //res.send(data);
      res.redirect('/department');
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Department.",
      });
    });

};