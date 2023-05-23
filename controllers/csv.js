const { log } = require('console');
const student=require('../models/student');
const ExportToCsv=require('export-to-csv').ExportToCsv;
const fs=require('fs');

module.exports.student_excelData=async(req,res)=>{
    
    try {
    const allStudent=await student.find().populate("interviews");
    let studentData=[];
    for(let student of allStudent){
        let students={};
        students.Batch_Name=student.batch;
        students.Student_Name=student.name;
        students.College_Name=student.collegeName;
        students.Email_ID=student.email;
        students.Student_Status=student.studentStatus;
        students.DSA_Score=student.dsaScore;
        students.WED_Score=student.webScore;
        students.REACT_Score=student.reactScore;
       
        if(student.interviews.length>0){
            for(let interview of student.interviews){
                
                console.log(' interview ',interview);
                students.Company_Name=interview.companyName;
                // students.Date=new Date(interview.date).toLocaleDateString("hi-IN",{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
                students.Date=new Date(interview.date).toLocaleDateString("en-US");
                students.Result=interview.result;
            }
        }else{
               students.Company_Name='NA';
               students.Date='NA';
               students.Result='NA';
            }
            studentData.push(students);

            }
            
    const options = { 
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalSeparator: '.',
        showLabels: true, 
        showTitle: false,
        title: 'csv file',
        useTextFile: false,
        useBom: true,
        useKeysAsHeaders: true,
      };

           const csvExporter = new ExportToCsv(options);
            const csvData= csvExporter.generateCsv(studentData,true);
            fs.writeFileSync('studentDetails.csv',csvData)
          return  res.download('studentDetails.csv')
        }catch(err){
            return res.status(400).json({
                status:false,
                message:"something went wronge",
                error:err
            })
        }
    }  





