const Students=require('../models/student');

module.exports.student_list=async(req,res)=>{
    const id=req.params.id;
    const student=await Students.findById(id);

         return res.status(200).render('edit-student',{
            updateStudent:student
         });
}

module.exports.updateStudent_details=async (req,res)=>{
    try{
    const id=req.params.id;
         //  console.log(req.body);
     const updateStudent=await Students.findByIdAndUpdate({_id:id},req.body);
     console.log('hello ho',updateStudent);
      return res.status(200).redirect('/employees/student-list');     
    }catch(err){
        return res.status(400).json(err);
    }
    }
