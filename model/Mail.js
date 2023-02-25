const mongoose = require("mongoose");

const MailSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
    },
    text: {
      type: String,
    },
    adminTable: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "adminTable",
    },
  },
  {
    timestamps: true,
  }
);

const Mail = mongoose.models.Mail || mongoose.model("mail", MailSchema);

module.exports = Mail;
