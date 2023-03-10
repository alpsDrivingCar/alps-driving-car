const mongoose = require("mongoose");

const TraineeDepartmentSchema = new mongoose.Schema(
  {
    description: {
      type: String,
    },
    title: {
      type: String,
    },
    departmentImg: {
      type: Array,
    },
    departmentPdf: {
      type: Array,
    },

    traineeTable: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "traineeTable",
    },
  },
  {
    timestamps: true,
  }
);

const TraineeDepartment =
  mongoose.models.TraineeDepartment ||
  mongoose.model("traineeDepartment", TraineeDepartmentSchema);

module.exports = TraineeDepartment;
