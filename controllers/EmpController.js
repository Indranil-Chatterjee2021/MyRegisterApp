const mongoose = require("mongoose");
const Employee = require("../models/employee.model");
const EmpDetail = require("../models/empDetail.model");
const Department = require("../models/department.model");
const { startSession } = require("mongoose");
const { getDate } = require("./dateFormat");

var getdates = getDate();

exports.loadEmp = (req, res) => {
  Department.find({}, { _id: 1, deptName: 1 }, (err, docs) => {
    console.log(docs);
    if (!err) {
      res.render("employee", {
        viewTitle: "Add Employee",
        list: docs,
        success: req.flash("Success"),
        error: req.flash("Err"),
      });
    }
  }).lean();
};

exports.create = async (req, res) => {
  const session = await startSession();
  session.startTransaction();
  try {
    var empname = req.body.empName;
    var mail = req.body.email;

    Employee.findOne(
      { $or: [{ empName: req.body.empName }, { email: req.body.email }] },
      function (err, result) {
        if (result) {
          console.log(result);
          empname = result.empName;
          email = result.email;
        }
      }
    );
    const employee = new Employee({
      empName: req.body.empName,
      salary: req.body.salary,
      email: req.body.email,
      dept_id: req.body.dept,
      createdAt: getdates,
    });
    await employee.save({ session });
    console.log("EMP successfully saved.");

    const empdetail = new EmpDetail({
      address: req.body.address,
      mobile: req.body.mobile,
      emp_id: employee._id,
      createdAt: getdates,
    });
    await empdetail.save({ session });
    console.log("EMP_Details successfully saved.");

    await session.commitTransaction();
    session.endSession();
    req.flash("Success", "New Employee Added Successfully !!");
    res.redirect("/employee");
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    req.flash(
      "Err",
      "Record already exists with Name: " + empname + " , Email: " + email
    );
    res.redirect("/employee");
    console.log(error);
  }
};
exports.creates = (req, res) => {
  if (req.body) {
    const code = req.body.empCode;
    Department.find((err, docs) => {
      Employee.exists({ empCode: code }, (err, doc) => {
        if (doc) {
          res.render("employee", {
            viewTitle: "Add Employee",
            error: "Employee present with this code: " + code + "",
            list: docs,
          });
          console.log(doc);
        } else {
          async () => {
            const session = await startSession();
            session.startTransaction();
            try {
              const employee = new Employee({
                _id: req.body.empCode,
                empName: req.body.empName,
                Email: req.body.email,
                Mobile: req.body.mobile,
              });
              await employee.save({ session });

              const empdetails = new EmpDetails({
                Salary: req.body.salary,
                Department: req.body.dept,
              });
              await empdetails.save({ session });

              await session.commitTransaction();
              session.endSession();
              console.log("Emp Success");
              res.render("employee", {
                viewTitle: "Add Employee",
                success: "Data Saved Successfully..",
                list: docs,
              });
            } catch (error) {
              await session.abortTransaction();
              session.endSession();
              console.log(error);
            }
          };

          // employee
          //   .save()
          //   .then((data) => {
          //     //res.send(data);
          //     // res.redirect('/employee');
          //     res.render("employee", {
          //       viewTitle: "Add Employee",
          //       success: "Data Saved Successfully..",
          //       list: docs,
          //     });
          //   })
          //   .catch((err) => {
          //     res.status(500).send({
          //       message:
          //         err.message ||
          //         "Some error occurred while creating the Employee.",
          //     });
          //   });
        }
      });
    });
  } else {
    return res.status(400).send({
      message: "Required field can not be empty",
    });
  }
};

exports.find = (req, res) => {
  if (req.params.id) {
    const id = req.params.id;
    console.log(typeof id);
    Department.find({}, { _id: 1, deptName: 1 }, (err, dept) => {
      Employee.aggregate([
        // Join with departments collection
        {
          $lookup: {
            from: "departments",
            localField: "dept_id",
            foreignField: "_id",
            as: "emp_info",
          },
        },
        { $unwind: "$emp_info" },

        // Join with empdetails collection
        {
          $lookup: {
            from: "empdetails",
            localField: "_id",
            foreignField: "emp_id",
            as: "emp_role",
          },
        },
        { $unwind: "$emp_role" },
        {
          $match: { $and: [{ "emp_role.emp_id": Number(id) }] },
        },

        // define which fields are you want to fetch
        {
          $project: {
            _id: 1,
            empName: 1,
            salary: 1,
            email: 1,
            //emp_id: "$emp_role.emp_id",
            department: "$emp_info.deptName",
            dept_id: 1,
            address: "$emp_role.address",
            mobile: "$emp_role.mobile",
          },
        },
      ]).exec((err, aggregate) => {
        res.render("empUpdate", {
          viewTitle: "Update Employee",
          list: dept,
          empData: "success",
          employee: aggregate,
        });
        console.log(aggregate);
      }); // end of empDetail Aggregation Method...
    }).lean(); // end of Department Model...
  } else {
    Employee.aggregate([
      // Join with departments collection
      {
        $lookup: {
          from: "departments",
          localField: "dept_id",
          foreignField: "_id",
          as: "emp_info",
        },
      },
      { $unwind: "$emp_info" },

      // Join with empdetails collection
      {
        $lookup: {
          from: "empdetails",
          localField: "_id",
          foreignField: "emp_id",
          as: "emp_role",
        },
      },
      { $unwind: "$emp_role" },
      // define which fields are you want to fetch
      {
        $project: {
          _id: 1,
          empName: 1,
          salary: 1,
          email: 1,
          //emp_id: "$emp_role.emp_id",
          department: "$emp_info.deptName",
          address: "$emp_role.address",
          mobile: "$emp_role.mobile",
        },
      },
    ]).exec((err, aggregate) => {
      res.render("employeeList", {
        success: req.flash("empUpdated"),
        empDel: req.flash("empDeleted"),
        error: req.flash("empFailed"),
        list: aggregate,
      });
      console.log(aggregate);
    });
  } // end of if-else statement..
};

exports.update = async (req, res) => {
  const session = await startSession();
  session.startTransaction();

  try {
    //Updating Employee Collection...
    await Employee.updateOne(
      { _id: req.body.id },
      {
        $set: {
          empName: req.body.empName,
          salary: req.body.salary,
          email: req.body.email,
          dept_id: req.body.dept,
          lastModified: getdates,
        },
      },
      { session }
    );

    //Updating Employee Details Collection...
    await EmpDetail.updateOne(
      { emp_id: req.body.id },
      {
        $set: {
          address: req.body.address,
          mobile: req.body.mobile,
        },
      },
      { session }
    );
    await session.commitTransaction();
    session.endSession();
    req.flash(
      "empUpdated",
      "Employee Updated Successfully Code [ " + req.body.id + " ]"
    );
    res.redirect("/employeeList");
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.log(error);
    req.flash("empFailed", "Updation Error !!");
    res.redirect("/employeeList");
  }
};

exports.delete = (req, res) => {
  const EMP_ID = req.params.id;
  Employee.findByIdAndRemove(EMP_ID, (err, docs) => {
    if (!err) {
      EmpDetail.findOneAndDelete({ emp_id: req.params.id }, (error, doc) => {
        if (!error) {
          console.log("Emp_Detail Deleted....");
          req.flash(
            "empDeleted",
            "Employee Deleted Successfully Code [ " + EMP_ID + " ]"
          );
          res.redirect("/employeeList");
        }
      });
    } else {
      console.log("Error in employee delete :" + err);
    }
  });
};
