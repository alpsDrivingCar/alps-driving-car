const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 3,
      max: 20,
    },
    lastName: {
      type: String,
      required: true,
      min: 3,
      max: 20,
    },
    imgUrl: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      min: 8,
    },

    phoneNumber: {
      type: String,
    },

    isAdmin: {
      type: Boolean,
      default: true,
    },
    isSupervisor: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Admin = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);

module.exports = Admin;
