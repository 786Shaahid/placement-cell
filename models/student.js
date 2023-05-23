const mongoose=require('mongoose');
const studentSchema=new mongoose.Schema({
         batch:{
           type:String,
           require:true
         },
         email:{
           type:String,
           require:true,
           unique:true 
         },
         name:{
           type:String,
           require:true 
         },
         collegeName:{
           type:String,
           require:true 
         },
         studentStatus:{
           type:String,
           enum:["Placed","Not_Placed"],
           require:true 
         },
         dsaScore:{
           type:String,
           require:true 
         },
         webScore:{
           type:String,
           require:true 
         },
         reactScore:{
           type:String,
           require:true 
         },
         interviews:[{
          type :mongoose.Schema.Types.ObjectId,
          ref:'Company'
      }]
},{timestamps:true});

module.exports=mongoose.model('Student',studentSchema);