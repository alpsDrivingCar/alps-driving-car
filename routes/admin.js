const router = require("express").Router();
const Admin = require("../model/Admin");
const { verifyAdmin, verifySupervisor } = require("../MiddleWare/Verify");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const Trainee = require("../model/Trainees");
router.get("/test", async (req, res) => {
  Admin.aggregate(
    [
      {
        $project: {
          createdAt: 1,
          week: { $week: "$createdAt" },
          firstName: "$firstName",
          lastName: "$lastName",
          totalAmount: "$totalAmount",
        },
      },
      {
        $group: {
          _id: "$week",
          data: { $push: "$$ROOT" },
        },
      },
    ],
    function (err, result) {
      if (err) {
        throw err;
        console.log(err);
        return;
      }

      res.status(200).json(result);
    }
  );
});

//get All Admins
router.get("/all", verifyAdmin, async (req, res) => {
  try {
    const Admins = await Admin.find({}).select("-password");

    res.status(200).json({ data: Admins });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get Unique Admin

router.get("/:id", verifyAdmin, async (req, res) => {
  try {
    const admin = await Admin.findOne({ _id: req.params.id }).select(
      "-password"
    );
    res.status(200).json(admin);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Delete Admin

router.delete("/:id", verifyAdmin, verifySupervisor, async (req, res) => {
  if (req.user._id === req.params.id)
    return res.status(400).json({ msg: "You can't do this action" });
  try {
    const admin = await Admin.findById(req.params.id).deleteOne();

    res.status(200).json({ msg: "Admin Deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.put("/:id", verifyAdmin, verifySupervisor, async (req, res) => {
  try {
    const admin = await Admin.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json({ msg: "successfully updated", data: admin });
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
});

module.exports = router;
