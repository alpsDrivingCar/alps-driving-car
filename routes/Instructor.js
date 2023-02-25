const router = require("express").Router();
const Instructor = require("../model/Instructor");
const { verifyAdmin } = require("../MiddleWare/Verify");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

//create new Instructor

router.post("/create", verifyAdmin, async (req, res) => {
  try {
    const email = req.body.instructor.email;
    const userEmail = await Instructor.findOne({ email });
    if (userEmail)
      return res.status(400).json({ msg: "This email already exists." });

    const newInstructor = new Instructor(req.body.instructor);
    const SavedInstructor = await newInstructor.save();
    res
      .status(200)
      .json({ instructor: SavedInstructor, msg: "create Successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

//get All Instructor
router.get("/all", verifyAdmin, async (req, res) => {
  try {
    const instructors = await Instructor.find({}).select("-password");

    res.status(200).json({ data: instructors });
  } catch (err) {
    res.status(500).json(err);
  }
});

//get instructor Percentage
router.get("/instructor-percentage", verifyAdmin, async (req, res) => {
  try {
    const instructors = await Instructor.find({
      totalAmount: { $gt: 0 },
    }).select("firstName lastName totalAmount amountRequired  amountPaid ");

    res.status(200).json({ data: instructors });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get Unique Instructor

router.get("/:id", verifyAdmin, async (req, res) => {
  try {
    const instructor = await Instructor.findOne({ _id: req.params.id });
    res.status(200).json(instructor);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Delete Instructor

router.delete("/:id", verifyAdmin, async (req, res) => {
  if (req.user._id === req.params.id)
    return res.status(400).json({ msg: "You can't do this action" });
  try {
    const instructor = await Instructor.findById(req.params.id).deleteOne();

    res.status(200).json({ msg: "Instructor Deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.put("/:id", verifyAdmin, async (req, res) => {
  try {
    const instructor = await Instructor.findByIdAndUpdate(req.params.id, {
      $set: req.body.instructor,
    });
    res.status(200).json({ msg: "successfully updated", data: instructor });
  } catch (err) {
    return res.status(500).json(err);
  }
});
router.put("/amount-paid/:id", async (req, res) => {
  try {
    let { amountPaid } = req.body;
    const instructor = await Instructor.findById(req.params.id);
    const amountRequired = instructor.amountRequired - amountPaid;
    amountPaid += instructor.amountPaid;

    await Instructor.findByIdAndUpdate(req.params.id, {
      $set: {
        amountRequired: amountRequired,
        amountPaid: amountPaid,
      },
    });
    res.status(200).json({ msg: "successfully updated" });
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.put("/calculagte-percentage/:id", async (req, res) => {
  try {
    const { percentage, numOfHours, hourlyCost } = req.body;
    const amountRequired = percentage * numOfHours * hourlyCost;

    const instructor = await Instructor.findByIdAndUpdate(req.params.id, {
      $set: { amountRequired, percentage, numOfHours, hourlyCost },
    });
    res.status(200).json({
      msg: "successfully updated",
      amountRequired,
      numOfHours,
      hourlyCost,
    });
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.put("/image/:id", verifyAdmin, async (req, res) => {
  try {
    const instructor = await Instructor.findById(req.params.id);

    await instructor.updateOne({
      $pull: { PDIimage: req.body.urlImage },
    });

    res.status(200).json("image has been Deleted ");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
