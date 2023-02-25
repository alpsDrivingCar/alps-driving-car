const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    amountPaid: {
      type: Number,
    },
    amountRequired: {
      type: Number,
    },
    totalAmount: {
      //benifits from instructor
      type: Number,
    },
    cloneTotal: {
      type: Number,
    },
    percentage: {
      type: Number,
    },
    numOfHours: {
      type: Number,
    },
    hourlyCost: {
      type: Number,
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Instructor",
    },
  },
  {
    timestamps: true,
  }
);

const student =
  mongoose.models.student || mongoose.model("Student", StudentSchema);

module.exports = student;
