const router = require("express").Router();
const Trainee = require("../model/Trainees");
const { verifyAdmin, verifySupervisor } = require("../MiddleWare/Verify");
const { body, validationResult } = require("express-validator");

//get All Trainees
router.get("/all", verifyAdmin, async (req, res) => {
  try {
    const Trainees = await Trainee.find({});

    res.status(200).json({ data: Trainees });
  } catch (err) {
    res.status(500).json(err);
  }
});

//create new Traniee

router.post("/create", verifyAdmin, async (req, res) => {
  try {
    const email = req.body.trainee.email;
    const userEmail = await Trainee.findOne({ email });
    if (userEmail)
      return res.status(400).json({ msg: "This email already exists." });

    const newTrainee = new Trainee(req.body.trainee);
    const SavedTrainee = await newTrainee.save();
    res.status(200).json({ Trainee: SavedTrainee, msg: "create Successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});
//Get Unique Trainee

router.get("/:id", verifyAdmin, async (req, res) => {
  try {
    const trainee = await Trainee.findOne({ _id: req.params.id });
    res.status(200).json(trainee);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Delete Trainee

router.delete("/:id", verifyAdmin, async (req, res) => {
  try {
    await Trainee.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({ msg: "Trainee Deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.put("/:id", verifyAdmin, async (req, res) => {
  try {
    const trainee = await Trainee.findByIdAndUpdate(req.params.id, {
      $set: req.body.trainee,
    });
    res.status(200).json({ msg: "successfully updated", data: trainee });
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
});

//update Image
router.put("/image/:id", verifyAdmin, async (req, res) => {
  try {
    const trainee = await Trainee.findById(req.params.id);

    await trainee.updateOne({
      $pull: { ADIimage: req.body.urlImage },
    });
    res.status(200).json("image has been Deleted ");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
