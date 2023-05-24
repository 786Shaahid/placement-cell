const route=require('express').Router();
const controllers=require('../controllers/employees'); 


route.get('/',controllers.sign_up);

module.exports=route;