const mongoose = require("mongoose");

const EnquirieSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 3,
      max: 20,
    },
    middleName: {
      type: String,
      min: 3,
      max: 20,
    },

    lastName: {
      type: String,
      required: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      required: true,
    },
    heldFullUk: {
      type: Boolean,
      default: false,
    },
    isOverOld: {
      type: Boolean,
      default: false,
    },
    lessThanPointLicence: {
      type: Boolean,
      default: false,
    },
    phoneNumber: {
      type: String,
    },

    notes: {
      type: String,
    },
    stage: {
      type: String,
      enum: [
        "Part one",
        "Part two",
        "Contract signed",
        "Contract sent",
        "No longer interested",
        "Left message",
        "Emailed",
        "Not eligible",
        "Awaiting DBS Check",
        "Awaiting details for Contract",
        "New Enquiry",
        "Call back",
        "Rejected enquirer",
        "Contact urgently",
        "See notes",
        "Appproved PDI",
      ],
    },
    jobRole: {
      type: String,
      enum: ["Instructor Enquiries", "Employee Enquiries", "Trainer Enquiries"],
    },
    areaLocated: {
      type: String,
    },
    gender: {
      type: Number,
      enum: [0, 1, 2],
    },
    privateNotes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Enquirie =
  mongoose.models.Enquirie || mongoose.model("Enquirie", EnquirieSchema);

module.exports = Enquirie;
