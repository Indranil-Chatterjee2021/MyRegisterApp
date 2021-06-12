const { matchedData, check, validationResult } = require("express-validator");

exports.validateDept = [
  // Department Code validation check ...
  check("deptCode", "Code should not be empty and must be in 4 digits")
    .trim()
    .notEmpty()
    .isInt()
    .isLength({ min: 4 }),
  // Department Name validation check ...
  check("deptname", "Name should not be empty").trim().notEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const data = matchedData(req);
      return res.render("department", { errors: errors.mapped(), Data: data });
    }
    next();
  },
];
