const router = require("express").Router();
const Traineetables = require("../model/TraineeTable");
const { verifyAdmin } = require("../MiddleWare/Verify");

//get All admin table
router.get("/all", async (req, res) => {
  try {
    const traineetables = await Traineetables.find({});

    res.status(200).json({ data: traineetables });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/create", async (req, res) => {
  try {
    const { name } = req.body;

    const newTraineeTable = new Traineetables({
      name,
    });
    await newTraineeTable.save();

    res.status(200).json({ msg: "created Successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
