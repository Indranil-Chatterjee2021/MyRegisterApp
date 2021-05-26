const express=require('express');
const router=express.Router();
const DeptCntrlr=require('../controllers/DeptController');
const EmpCntrlr=require('../controllers/EmpController');

router.get('/', (req,res) => {
    res.render('home',{viewTitle: 'WellCome'});
});

// router.get('/department', (req,res) => {
//     res.render('department',{viewTitle: 'Add Department'});
// });

router.get('/department', DeptCntrlr.loadDept);
router.post('/department', DeptCntrlr.create);

router.get('/employee', EmpCntrlr.loadEmp);
router.post('/employee', EmpCntrlr.create);
router.get('/employeeList', EmpCntrlr.find);
router.get('/employee/:id', EmpCntrlr.find);
router.post("/employee/update", EmpCntrlr.update);
router.get('/employee/delete/:id', EmpCntrlr.delete);

module.exports=router;