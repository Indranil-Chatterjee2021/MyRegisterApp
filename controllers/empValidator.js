const { matchedData, check, validationResult } = require("express-validator");
const Department = require("../models/department.model");

exports.validateEmp = [
  // Employee Name validation check ...
  check("empName", "Name should not be empty").trim().notEmpty(),
  // Employee Name validation check ...
  check("address", "Address should not be empty").trim().notEmpty(),
  // Email validation check ...
  check("email", "Valid Email address required")
    .notEmpty()
    .normalizeEmail()
    .isEmail(),
  // Mobile No validation check ...
  check("mobile", "Mobile No should not be empty and must be in 10 digits")
    .trim()
    .notEmpty()
    .isInt()
    .isLength({ max: 10 }),
  // Salary validation check ...
  check("salary", "Salary should not be empty and must be in digits")
    .trim()
    .notEmpty()
    .isInt(),
  // Department validation check ...
  check("dept", "Department name is required").trim().notEmpty(),
  check("depat", "Department name is required").trim().notEmpty(),
  (req, res, next) => {
    Department.find({}, { _id: 1, deptName: 1 }, (err, docs) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const data = matchedData(req);
        return res.render("employee", {
          errors: errors.mapped(),
          Data: data,
          list: docs,
        });
      }
      next();
    });
  },
];

// const EmpValidationRules = () => {
//   return [
//     // Employee Name validation check ...
//     check("empName", "Name should not be empty").trim().notEmpty(),
//     // Employee Name validation check ...
//     check("address", "Address should not be empty").trim().notEmpty(),
//     // Email validation check ...
//     check("email", "Valid Email address required")
//       .notEmpty()
//       .normalizeEmail()
//       .isEmail(),
//     // Mobile No validation check ...
//     check("mobile", "Mobile No should not be empty and must be in 10 digits")
//       .trim()
//       .notEmpty()
//       .isInt()
//       .isLength({ max: 10 }),
//     // Salary validation check ...
//     check("salary", "Salary should not be empty and must be in digits")
//       .trim()
//       .notEmpty()
//       .isInt(),
//     // Department validation check ...
//     check("dept", "Department name is required").trim().notEmpty(),
//     check("depat", "Department name is required").trim().notEmpty(),
//   ];
// };

// const validator = (req, res, next) => {
//   Department.find({}, { _id: 1, deptName: 1 }, (err, docs) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       const data = matchedData(req);
//       return res.render("employee", {
//         errors: errors.mapped(),
//         Data: data,
//         list: docs,
//       });
//     }
//     next();
//   });
// };

// module.exports = {
//   EmpValidationRules,
//   validator,
// };
