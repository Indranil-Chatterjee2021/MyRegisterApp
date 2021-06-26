const { matchedData, check, validationResult } = require("express-validator");
const Department = require("../models/department.model");

exports.validateEmp = [
  // Employee Name validation check ...
  check("empName")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .matches(/^[a-zA-Z\s]*$/)
    .withMessage("Only Characters with white space are allowed"),
  // Employee Name validation check ...
  check("address")
    .trim()
    .notEmpty()
    .withMessage("Address is required")
    .matches(/^[a-zA-Z0-9\s,.-]{3,}$/)
    .withMessage("Please enter valid address"),
  // Email validation check ...
  check("email", "Valid Email address required")
    .notEmpty()
    .normalizeEmail()
    .isEmail(),
  // Mobile No validation check ...
  check("mobile")
    .trim()
    .notEmpty()
    .withMessage("Mobile No is required")
    .matches(
      /^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[6789]\d{9}|(\d[ -]?){10}\d$/
    )
    .withMessage("Mobile No must be start with 6,7,8,9 Min 10 digits"),

  // Salary validation check ...
  check("salary")
    .trim()
    .notEmpty()
    .withMessage("Salary is required")
    .toInt()
    .withMessage("Salary must be in digits")
    .matches(/^[1-9][0-9]*(\.[0-9])?/)
    .withMessage("Salary should be a positve value"),
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
    }).lean();
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
