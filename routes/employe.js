const route=require('express').Router();
const controllers=require('../controllers/employees'); 
const verifyToken=require('../middleware/auth');
const studentDetail=require('../controllers/student');
const jobDetails=require('../controllers/company');
const interviewDetails=require('../controllers/interview');
const excelStudentData=require('../controllers/csv')
const updateStudent=require('../controllers/edit-student');

// update student details
route.get('/edit-student/:id',updateStudent.student_list)
route.post('/updetedStudent/:id',updateStudent.updateStudent_details);

// get home page
route.get('/home',verifyToken,controllers.home);

// get student list page
route.get('/student-list',studentDetail.student_list);

// add company and apply for interviews
route.get('/add-company',jobDetails.get_company);
route.post('/add-company',jobDetails.company_details);

// Add company and enrollred student
route.get('/enroll-student/:id',interviewDetails.get_interview);
route.post('/interview-details/:id',interviewDetails.update_interview);

// sign up for employees
route.post('/signup',controllers.signup_post);


// sign in for employees
route.get('/signin',verifyToken,controllers.sign_in);
route.post('/signin',controllers.signin_post);

// add new student and student list
route.get('/student',controllers.student);
route.post('/student',studentDetail.studentForm);

// detele student 
route.get('/delete/:id',studentDetail.delete_student);

// Data in Excel format
route.get('/download-excel-data',excelStudentData.student_excelData);









module.exports=route;
