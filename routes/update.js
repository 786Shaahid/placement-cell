const route=require('express').Router();
const controllers=require('../controllers/employees'); 


route.get('/',controllers.sign_up);
route.post('/signup',controllers.signup_post);

module.exports=route;