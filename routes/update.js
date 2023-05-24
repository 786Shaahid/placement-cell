const route=require('express').Router();
const controllers=require('../controllers/employees'); 

// sign up page
route.get('/',controllers.sign_up);

module.exports=route;