const { model } = require("mongoose");
const Company = require("../models/company");
const Student = require("../models/student");

module.exports.get_interview = async (req, res) => {
  const id = req.params.id;
  let companies = await Company.findById(id);
  return res.status(200).render("interview-details", {
    allcompany: companies,
    title: "interview-details",
  });
};

// iska name change karunga or age se ase galti nhi karunga
// update interview status rkhunga
module.exports.update_interview = async (req, res) => {
  const id = req.params.id;

  //   check student registered or not
  const student = await Student.findOne({ email: req.body.email });
  if (!student)
    return res.status(400).json({
      status: false,
      message: "Student not register in our database !",
    });
  // update student result
  const company = await Company.findById(id);
  company.result = req.body.result;
  student.interviews.push(company);
  try {
    await company.save();
    await student.save();
    console.log(company);
    return res.status(200).redirect("/employees/home");
  } catch (err) {
    return res.status(400).json({
      status: false,
      message: "Failed !",
      error: err,
    });
  }
};
