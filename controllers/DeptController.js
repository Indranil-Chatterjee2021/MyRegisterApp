const Department = require("../models/department.model");
const { startSession } = require("mongoose");
const { getDate } = require("./dateFormat");
const { json } = require("body-parser");

var getdates = getDate();

exports.loadDept = (req, res) => {
  res.render("department", {
    viewTitle: "Add Department",
    success: req.flash("Success"),
    error: req.flash("Error"),
  });
};

exports.deptList = (req, res) => {
  const postPerPage = 5;
  const page = req.query.page || 1;
  Department.find({})
    .lean()
    .skip(postPerPage * page - postPerPage)
    .limit(postPerPage)
    .then((docs) => {
      Department.countDocuments().then((deptCount) => {
        res.render("departmentList", {
          list: docs,
          current: parseInt(page),
          pages: Math.ceil(deptCount / postPerPage),
          success: req.flash("deptUpdated"),
          error: req.flash("deptFailed"),
        });
        //console.log(docs);
      });
    });
  // Department.find((err, docs) => {
  //   if (!err) {
  //     res.render("departmentList", {
  //       success: req.flash("deptUpdated"),
  //       error: req.flash("deptFailed"),
  //       list: docs,
  //     });
  //   }
  // });
};

exports.create = async (req, res) => {
  const session = await startSession();
  session.startTransaction();
  try {
    var deptCode = req.body.deptCode;
    var deptname = req.body.deptname;

    Department.findOne(
      { $or: [{ _id: deptCode }, { deptName: deptname }] },
      function (err, result) {
        if (result) {
          console.log(result);
          deptCode = result._id;
          deptname = result.deptName;
        }
      }
    );
    const department = new Department({
      _id: req.body.deptCode,
      deptName: req.body.deptname,
      createdAt: getdates,
    });
    await department.save({ session });
    await session.commitTransaction();
    session.endSession();
    req.flash("Success", "New Department Added Successfully !!");
    res.redirect("/department");
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    req.flash(
      "Error",
      "Record already exists with Code: " + deptCode + " , Name: " + deptname
    );
    res.redirect("/department");
    console.log(error);
  }
};

exports.find = (req, res) => {
  if (req.params.id) {
    Department.findById({ _id: req.params.id }, (err, data) => {
      if (!err) {
        res.render("deptUpdate", { docs: data });
        console.log(data);
      }
    }).lean();
  }
};

exports.update = async (req, res) => {
  const session = await startSession();
  session.startTransaction();

  try {
    //Updating Department Collection...
    await Department.updateOne(
      { _id: req.body.deptCode },
      {
        $set: {
          deptName: req.body.deptName,
          lastModified: getdates,
        },
      },
      { session }
    );

    await session.commitTransaction();
    session.endSession();
    req.flash(
      "deptUpdated",
      "Department Updated Successfully Code [ " + req.body.deptCode + " ]"
    );
    res.redirect("/departmentList");
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.log(error);
    req.flash("deptFailed", "Updation Error !!");
    res.redirect("/departmentList");
  }
};
