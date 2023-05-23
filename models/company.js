const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      require: true,
    },
    date: {
      type: String,
      require: true,
    },
    result: {
      type: String,
      enum: ["Pass", "On Hold", "Fail", "Didn't attempt"],
    }
  },
  { timestamps: true }
);
module.exports=mongoose.model("Company", interviewSchema);
