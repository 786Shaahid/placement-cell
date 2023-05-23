const { error } = require("@hapi/joi/lib/annotate");
const Company = require("../models/company");

module.exports.get_company = async(req, res) => {
  let allcompany = await Company.find().sort({createdAt:-1});
  if(allcompany){
    allcompany=allcompany.map(company=>{
    return {
        id:company._id,
        name:company.companyName,
        date:company.date
    }
    }) 
    return res.status(200).render("add-company",{
      companydetails:allcompany
  
    });
  }else{
    return res.status(200).render("add-company")
  }
};

module.exports.company_details = async (req, res) => {
  const companyDetails = new Company({
    companyName:req.body.companyName,
    date:req.body.date
  })
  try{
        await companyDetails.save();
        return res.status(200).redirect("back");
  }catch(err){
    return res.json(err)
  }


 
}
