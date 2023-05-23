const { string } = require('@hapi/joi');
const mongoose=require('mongoose');
    const employeesSchema= new mongoose.Schema({
           name:{
            type:String,
            required:true
           },
           email:{
            type:String,
            required:true,
            unique:true
           },
           password:{
            type:String,
            required:true
           },
           token:{
            type:String,
            unique:true
           }
},{timestamps:true});

module.exports=mongoose.model("Employee",employeesSchema);