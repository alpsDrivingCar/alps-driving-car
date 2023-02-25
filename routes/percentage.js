const router = require("express").Router();
const Percentage = require("../model/Percentage");
const { verifyAdmin } = require("../MiddleWare/Verify");

//get all percentage

router.get("/all", async (req, res) => {
  try {
    const percentages = await Percentage.find({});

    res.status(200).json({ data: percentages });
  } catch (err) {
    res.status(500).json(err);
  }
});
router.post("/create", async (req, res) => {
  try {
    let { percentage } = req.body;
    const newPercentage = new Percentage(req.body);
    const SavedPercentage = await newPercentage.save();

    res.status(200).json({ msg: `created Successfully , ${SavedPercentage}` });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
