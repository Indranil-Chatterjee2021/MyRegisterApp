const Employee = require("../models/employee.model");
const Department = require("../models/department.model");

exports.loadEmp = (req,res) => {
    Department.find({},{_id:0,deptName:1},(err,docs) => {
      console.log(docs);
        if(!err){
            res.render("employee", {
                viewTitle: 'Add Employee', list: docs
            });
        }
    });
  };

exports.create = (req , res) =>{
      if(req.body){
        const code=req.body.empCode;
        Department.find((err,docs)=>{
          Employee.exists({empCode:code}, (err,doc)=>{
            if(doc){
              res.render("employee", {
                viewTitle: "Add Employee",
                error: 'Employee present with this code: '+code+'',
                list: docs
              });
              console.log(doc);
            }else{
              const employee = new Employee({
                empCode: req.body.empCode,
                empName: req.body.empName,
                Mobile: req.body.mobile,
                Salary: req.body.salary,
                department: req.body.dept,
               });
               employee
               .save()
               .then((data) => {
                //res.send(data);
                // res.redirect('/employee');
                res.render("employee", {
                  viewTitle: "Add Employee",
                  success: 'Data Saved Successfully..',
                  list: docs
                });
               })
               .catch((err) => {
                 res.status(500).send({
                   message: err.message || "Some error occurred while creating the Employee.",
                 });
               });
            }
    
          })
        })
      }else{
          return res.status(400).send({
          message: "Required field can not be empty",
          });
       }
      
  };

exports.find = (req , res) =>{
  Department.find({},{_id:0,deptName:1},(err,dept) => {
    //console.log(d);
    if(!err){

      if(req.params.id){
        const id=req.params.id;
        Employee.findById(id, (err,docs) => {
          if (!err) {
            res.render("employee", {
                viewTitle: "Update Employee",
                employee: docs, list: dept
            });
        }
        })
      }else{
        Employee.find((err,docs) => {
          if(!err){
            res.render("employeeList", {
                list: docs
            });
        } 
        });
      }
    }
});
};  

exports.update = (req , res) =>{
  if(req.body._id){
    Employee.findOneAndUpdate({ _id: req.body._id }, {empCode:req.body.empCode,
                                                      empName:req.body.empName,
                                                      Mobile:req.body.mobile,
                                                      Salary:req.body.salary,
                                                      department:req.body.depat
    }, { new: true }, (err, doc) => {
      if (!err) { res.redirect('/employeeList'); }
      else {
              console.log('Error during record update : ' + err);
           }
     });
  }
};

exports.delete = (req , res) =>{
  Employee.findByIdAndRemove(req.params.id, (err,docs)=>{
    if(!err){
      res.redirect('/employeeList');
      console.log("Deleted User : ", docs);
    }
    else { console.log('Error in employee delete :' + err); }
    
  })
};


