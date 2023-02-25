const router = require("express").Router();
const Employee = require("../model/Employee");
const { verifyAdmin } = require("../MiddleWare/Verify");

router.get("/all", verifyAdmin, async (req, res) => {
  try {
    const employees = await Employee.find({});

    res.status(200).json({ data: employees });
  } catch (err) {
    res.status(500).json(err);
  }
});
//create new Employee

router.post("/create", verifyAdmin, async (req, res) => {
  try {
    const email = req.body.employee.email;
    const userEmail = await Employee.findOne({ email });
    if (userEmail)
      return res.status(400).json({ msg: "This email already exists." });

    const newEmployee = new Employee(req.body.employee);
    const SavedEmployee = await newEmployee.save();
    res
      .status(200)
      .json({ Employee: SavedEmployee, msg: "create Successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

//Get Unique Employee

router.get("/:id", verifyAdmin, async (req, res) => {
  try {
    const employee = await Employee.findOne({ _id: req.params.id });
    res.status(200).json(employee);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Delete Employee

router.delete("/:id", verifyAdmin, async (req, res) => {
  try {
    await Employee.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({ msg: "Trainee Deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

//update employee
router.put("/:id", verifyAdmin, async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, {
      $set: req.body.employee,
    });
    res.status(200).json({ msg: "successfully updated", data: employee });
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
});

//update Image
router.put("/image/:id", verifyAdmin, async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    await employee.updateOne({
      $pull: { contractCopyImg: req.body.urlImage },
    });
    await employee.updateOne({
      $pull: { curriculumValueImg: req.body.urlImage },
    });
    res.status(200).json("image has been Deleted ");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
