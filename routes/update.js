const route=require('express').Router();
const updateStudent=require('../controllers/edit-student');

route.get('/edit-student/:id',updateStudent.student_list)
route.post('/updetedStudent/:id',updateStudent.updateStudent_details);

module.exports=route;