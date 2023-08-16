const express=require('express');
const {registrationValidator,loginValidator}=require('../config/validator');
const User=require('../models/employee');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
require('dotenv').config();
const cookie=require('cookie');

// render all these file 
module.exports.inteview= async (req,res)=>{
  res.render('interviews-details');
}
module.exports.sign_up= async (req,res)=>{
  res.render('employees-sign_up');
}
module.exports.student= async (req,res)=>{
  res.render('student-details');
}
module.exports.sign_in= async (req,res)=>{
    res.render('employees-sign_in');
}
module.exports.home= async (req,res)=>{
    res.render('home');
}

module.exports.signup_post=async(req,res)=>{
    // validate the users input
       const {error} = await registrationValidator(req.body);
      if(error) return res.status(400).send(error.message); 
     
      // check email exist in database or not
     const emailExits= await User.findOne({email:req.body.email});
     if(emailExits) return res.status(200).render('employees-sign_in',{message:"This email is already exits,Please login with email and your password"});
     
     //hashing the password
   const salt= await bcrypt.genSalt(10);
   const hashPassword= await bcrypt.hash(req.body.password,salt);
// new user sign up 
if(req.body.confirmpassword===req.body.password){
    const user=new User({
      name:req.body.name,
      email:req.body.email,
      password:hashPassword
    })
    try{
      // create token
      const token = jwt.sign(
        { user_id: user._id},
        process.env.TOKEN_KEY,
      );
      // save user token
      user.token =  token;
        const userData= await user.save();
              res.cookie('auth',userData.token);
              // console.log("empolyee signup",req.cookies);
        return res.status(200).render('employees-sign_in',{message:""});
    }catch(err){
      return res.status(400).send(err);
    }

}else{
    return res.status(500).send('passport and confirm passport does not match..!')
}
}

// post signin page
module.exports.signin_post=async(req,res)=>{
// validate the user's email and passport
const {error}=await loginValidator(req.body);
if(error) return res.status(400).send(error.message);

// check email exits or not
const userExits=await User.findOne({email:req.body.email});
if(!userExits) return res.status(400).send('This is email not exits..!');

// compare password
 const comparePassword=await bcrypt.compare(req.body.password,userExits.password);
  if(!comparePassword) return res.status(400).send('Please enter correct password !');

// if both correct 
 if(userExits && comparePassword) {
 return res.status(200).render('home');
 }else{
    return res.status(400).send('Invalid Credential !')
 }

}