
// validate the user input
const joi=require('@hapi/joi');
module.exports.registrationValidator=(data)=>{
      const schema= joi.object({
       name:joi.string().string().min(3).max(30).required(),
       email:joi.string().email().min(6).max(40).required(),
       password:joi.string().min(6).max(20).required(),
       confirmpassword:joi.string().min(6).max(20).required()
        })
      return schema.validate(data) ; 
}
module.exports.loginValidator=(data)=>{
      const schema=   joi.object({
       email:joi.string().email().min(6).max(40).required(),
       password:joi.string().min(6).max(20).required(),
        })
      return schema.validate(data) ; 
}
