const express = require("express");
const router = express.Router();
const { validateDept } = require("../controllers/deptValidator");
const { validateEmp } = require("../controllers/empValidator");
const DeptCntrlr = require("../controllers/DeptController");
const EmpCntrlr = require("../controllers/EmpController");

//Home Page Route....
router.get("/", (req, res) => {
  res.render("home", {
    viewTitle: "A NodeJs ExpressJs MongoDB CRUD Web Application",
  });
});

// Department Routings....
router.get("/department", DeptCntrlr.loadDept);
router.post("/department", validateDept, DeptCntrlr.create);
router.get("/departmentList", DeptCntrlr.deptList);
router.get("/department/:id", DeptCntrlr.find);
router.post("/department/update", DeptCntrlr.update);

// Employee Routings....
router.get("/employee", EmpCntrlr.loadEmp);
router.post("/employee", validateEmp, EmpCntrlr.create);
router.get("/employeeList", EmpCntrlr.find);
router.get("/employee/:id", EmpCntrlr.find);
router.post("/empUpdate", EmpCntrlr.update);
router.get("/employee/delete/:id", EmpCntrlr.delete);

module.exports = router;
