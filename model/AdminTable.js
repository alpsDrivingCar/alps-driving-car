const mongoose = require("mongoose");

const AdminTableSchema = new mongoose.Schema(
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

const AdminTable =
  mongoose.models.AdminTable || mongoose.model("adminTable", AdminTableSchema);

module.exports = AdminTable;
