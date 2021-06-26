const express = require("express");
const router = express.Router();
const { upload } = require("../fileUploader/uploader");
const { validateUser } = require("../controllers/userValidator");
const { validateDept } = require("../controllers/deptValidator");
const { validateEmp } = require("../controllers/empValidator");
const login_reg_cntrl = require("../controllers/login_regController");
const DeptCntrlr = require("../controllers/DeptController");
const EmpCntrlr = require("../controllers/EmpController");

//Login/Home Page Route....
// router.get("/home", (req, res) => {
//   res.render("home", {
//     viewTitle: "A NodeJs ExpressJs MongoDB CRUD Web Application",
//   });
// });
router.get("/home", login_reg_cntrl.userList);

router.get("/", login_reg_cntrl.getLogin);
router.post("/login", login_reg_cntrl.logIn);
router.get("/logout", login_reg_cntrl.logOut);

//Registration Route...
router.get("/register", login_reg_cntrl.getRegister);
router.post("/", login_reg_cntrl.creates);

router.get("/userList", login_reg_cntrl.userList);

// Change/Forget Pwd Route...
router.get("/forgetpass", (req, res) => {
  res.render("forget");
});
router.post("/forgetpass", login_reg_cntrl.forgetPwd);

// Department Routings....
router.get("/department", DeptCntrlr.loadDept);
router.post("/department", validateDept, DeptCntrlr.create);
router.get("/departmentList", DeptCntrlr.deptList);
router.get("/department/:id", DeptCntrlr.find);
router.post("/department/update", DeptCntrlr.update);

// Employee Routings....
router.get("/employee", EmpCntrlr.loadEmp);
router.post("/employee", validateEmp, EmpCntrlr.create);
router.get("/employeeList", EmpCntrlr.empList);
router.get("/employee/:id", EmpCntrlr.find);
router.post("/empUpdate", EmpCntrlr.update);
router.get("/employee/delete/:id", EmpCntrlr.delete);

module.exports = router;
