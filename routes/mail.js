const router = require("express").Router();
const Mail = require("../model/Mail");
const AdminTable = require("../model/AdminTable");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");

const { verifyAdmin, verifySupervisor } = require("../MiddleWare/Verify");

//get All mail
router.get("/all/:id", async (req, res) => {
  try {
    const mails = await Mail.find({ adminTable: req.params.id }).populate(
      "adminTable"
    );

    res.status(200).json({ data: mails });
  } catch (err) {
    res.status(500).json(err);
  }
});

//create new Mail

router.post("/create", async (req, res) => {
  try {
    const { subject, text, adminTable, pdfMail, imageMail } = req.body;

    const newMail = new Mail({
      subject,
      text,
      adminTable,
      pdfMail,
      imageMail,
    });
    const SavedMail = await newMail.save();

    res.status(200).json({ msg: "created Successfully", data: SavedMail });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

//Get Unique Mail

router.get("/:id", verifyAdmin, async (req, res) => {
  try {
    const mail = await Mail.findOne({ _id: req.params.id });
    res.status(200).json(mail);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Delete Mail

router.delete("/:id", verifyAdmin, async (req, res) => {
  try {
    await Mail.findByIdAndDelete({ _id: req.params.id });

    res.status(200).json({ msg: "Mail Deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

//update mail
router.put("/:id", async (req, res) => {
  try {
    const mail = await Mail.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json({ msg: "successfully updated", data: mail });
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
});

// send email
router.post("/send-email", async (req, res) => {
  const { subject, text, toEmails } = req.body;
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "alialaqrabawi112@gmail.com", // replace with your email
      pass: "jwusndckhfubvacr", // replace with your password
    },
  });

  const mailOptions = {
    from: "alialaqrabawi112@gmail.com",
    to: toEmails.join(", "),
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(500).send("Error sending email");
    } else {
      res.status(200).send("Email sent successfully!");
    }
  });
});

module.exports = router;
