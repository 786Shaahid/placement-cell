const route=require('express').Router();
const controllers=require('../controllers/employees'); 
const verifyToken=require('../middleware/auth');
const studentDetail=require('../controllers/student');
const jobDetails=require('../controllers/company');
const interviewDetails=require('../controllers/interview');
const excelStudentData=require('../controllers/csv')
route.get('/home',controllers.home);

route.get('/',controllers.home);



route.get('/student-list',studentDetail.student_list);

route.get('/add-company',jobDetails.get_company);
route.post('/add-company',jobDetails.company_details);

route.get('/signup',controllers.sign_up);
route.post('/signup',controllers.signup_post);

// Add company and enrollred student
route.get('/enroll-student/:id',interviewDetails.get_interview);
route.post('/interview-details/:id',interviewDetails.update_interview);


route.get('/signin',controllers.sign_in);
route.post('/signin',verifyToken,controllers.signin_post);

route.get('/student',controllers.student);
route.post('/student',studentDetail.studentForm);

// detele student 
route.get('/delete/:id',studentDetail.delete_student);

// Data in Excel format
route.get('/download-excel-data',excelStudentData.student_excelData);









module.exports=route;
