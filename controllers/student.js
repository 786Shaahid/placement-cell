
const studentDetail=require('../models/student');
const interview=require('../models/company');
// show student list
module.exports.student_list=async (req,res)=>{ 
  const student=await studentDetail  
    let allstudent=await studentDetail.find().populate('interviews');
        allstudent=allstudent.map(student=>{
             return student
        })     
   return res.status(200).render('student-list',{
      title:"Student-list",
      students:allstudent
   })
}

// Add new student
module.exports.studentForm=async (req,res)=>{
// check student exits or not
     const user= await studentDetail.findOne({email:req.body.email});
     if(user) return res.status(400).json('This student Exits Already..!')
// save student data to database
    try{
        const student=new studentDetail(req.body);
        await student.save();
      return   res.status(200).redirect("/employees/home")
  }catch(err){
    return res.status(400).send(err);
  }
}

// delete student Details and student from company
module.exports.delete_student=async(req,res)=>{
  try{
    const id=req.params.id;
    const getStudent=await studentDetail.findByIdAndDelete(id);
    return res.status(200).redirect('back');
  }catch(err){
    return res.status(400).JSON({
      status:failed,
      message:"Data doesn't deleted.. !",
      error:err
    })

  }

}
