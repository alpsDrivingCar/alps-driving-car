const mongoose = require("mongoose");

const PercentageSchema = new mongoose.Schema(
  {
    percentage: {
      type: Number,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const Percentage =
  mongoose.models.Percentage || mongoose.model("percentage", PercentageSchema);

module.exports = Percentage;
