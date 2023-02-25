const mongoose = require("mongoose");

const TraineetablesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const Traineetables =
  mongoose.models.Traineetables ||
  mongoose.model("traineetables", TraineetablesSchema);

module.exports = Traineetables;
