const { matchedData, check, validationResult } = require("express-validator");

exports.validateUser = [
  // Username validation check ...
  check("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .matches(/^[a-zA-Z ]*$/)
    .withMessage("Only Characters with white space are allowed"),
  // Email address validation
  check("email")
    .notEmpty()
    .withMessage("Email Address required")
    .normalizeEmail()
    .isEmail()
    .withMessage("Must be a valid email"),
  // Password validation
  check("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be minimum 6 length"),
  // Confirm password validation
  check("passwordConf").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Password Confirmation does not match password");
    }
    return true;
  }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const data = matchedData(req);
      return res.render("register", { errors: errors.mapped(), Data: data });
    }
    next();
  },
];
