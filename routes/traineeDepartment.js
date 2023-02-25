const router = require("express").Router();
const TraineeDepartment = require("../model/TraineeDepartment");

//get All Trainee department
router.get("/all/:id", async (req, res) => {
  try {
    const students = await TraineeDepartment.find({
      traineeTable: req.params.id,
    });

    res.status(200).json({ data: students });
  } catch (err) {
    res.status(500).json(err);
  }
});

//create new Trainee Department
router.post("/create", async (req, res) => {
  try {
    const { title, description, traineeTable } = req.body;

    const newDepartment = new TraineeDepartment({
      title,
      description,
      traineeTable,
    });
    await newDepartment.save();

    res.status(200).json({ msg: "created Successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.post("/create", async (req, res) => {
  try {
    const { title, description, traineeTable } = req.body;

    const newTraineeDepartment = new TraineeDepartment({
      description,
      traineeTable,
      title,
    });
    await newTraineeDepartment.save();

    res.status(200).json({ msg: "created Successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

//Get Unique trainee department

router.get("/:id", async (req, res) => {
  try {
    const traineeDepartment = await TraineeDepartment.findOne({
      _id: req.params.id,
    });
    res.status(200).json(traineeDepartment);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Delete trainee department

router.delete("/:id", async (req, res) => {
  try {
    await TraineeDepartment.findByIdAndDelete({ _id: req.params.id });

    res.status(200).json({ msg: "Trainee Department Deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

//update trainee department
router.put("/:id", async (req, res) => {
  try {
    const traineeDepartment = await TraineeDepartment.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      }
    );
    res
      .status(200)
      .json({ msg: "successfully updated", data: traineeDepartment });
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
});

module.exports = router;
