const router = require("express").Router();
const Student = require("../model/Studnet");
const Instructor = require("../model/Instructor");
const mongoose = require("mongoose");

const { verifyAdmin, verifySupervisor } = require("../MiddleWare/Verify");

router.get("/student-list/:id", async (req, res) => {
  Student.aggregate(
    [
      {
        $match: {
          instructor: mongoose.Types.ObjectId(req.params.id),
        },
      },
      {
        $project: {
          createdAt: {
            $dateToString: { format: "%Y/%m/%d", date: "$createdAt" },
          },
          week: { $week: "$createdAt" },
          fullName: { $concat: ["$firstName", " ", "$lastName"] },
          totalAmount: "$totalAmount",
          instructor: "$instructor",
          percentage: "$percentage",
        },
      },

      {
        $group: {
          _id: "$week",
          total: { $sum: "$totalAmount" },
          student: { $push: "$$ROOT" },
        },
      },
    ],

    function (err, result) {
      console.log(result);
      result.forEach((res) => {
        res.student.forEach((student) => {
          student.totalAmount = (student.totalAmount * 1).toFixed(2);
        });
      });
      if (err) {
        console.log(err);
        return;
      }

      res.status(200).json(result);
    }
  );
});

//get All Student
router.get("/all/:id", async (req, res) => {
  try {
    const students = await Student.find({ instructor: req.params.id }).populate(
      "instructor"
    );

    res.status(200).json({ data: students });
  } catch (err) {
    res.status(500).json(err);
  }
});

//create new student

router.post("/create", async (req, res) => {
  try {
    let { percentage, firstName, lastName, instructor, total } =
      req.body.student;

    const totalAmount = percentage * total;

    const Instructors = await Instructor.findOne({ _id: instructor });
    let totalInstructorAmount = Instructors?.totalAmount;
    if (totalInstructorAmount === undefined) {
      totalInstructorAmount = 0;
    }
    totalInstructorAmount += totalAmount;
    await Instructor.findByIdAndUpdate(instructor, {
      $set: {
        totalAmount: totalInstructorAmount,
      },
    });

    const newStudent = new Student({
      firstName,
      lastName,
      totalAmount,
      instructor,
      percentage,
    });
    const SavedStudent = await newStudent.save();

    res.status(200).json({ msg: "created Successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});
//Get Unique student

router.get("/:id", verifyAdmin, async (req, res) => {
  try {
    const student = await Student.findOne({ _id: req.params.id });
    res.status(200).json(student);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Delete student

router.delete("/:id", verifyAdmin, async (req, res) => {
  try {
    const student = await Student.findOne({ _id: req.params.id });
    const instructorId = student.instructor;
    const instructor = await Instructor.findOne({ _id: instructorId });
    let totalAmountInstructor = instructor.totalAmount - student.totalAmount;
    await Student.findByIdAndDelete({ _id: req.params.id });
    await Instructor.findByIdAndUpdate(instructorId, {
      $set: {
        totalAmount: totalAmountInstructor,
      },
    });
    res.status(200).json({ msg: "Student Deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { firstName, lastName, percentage, total } = req.body.data;
    const student = await Student.findOne({ _id: req.params.id });
    const instructorId = student.instructor;
    const instructor = await Instructor.findOne({ _id: instructorId });
    let totalAmountInstructor = instructor.totalAmount - student.totalAmount;
    const newTotal = percentage * total;
    totalAmountInstructor += newTotal;
    await Instructor.findByIdAndUpdate(instructorId, {
      $set: {
        totalAmount: totalAmountInstructor,
      },
    });
    await Student.findByIdAndUpdate(req.params.id, {
      $set: {
        totalAmount: newTotal,
        percentage: percentage,
        firstName: firstName,
        lastName: lastName,
      },
    });

    res.status(200).json({
      msg: "successfully updated",
      data: student,
    });
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
});

//get Instructor Student
router.get("/instructor-student/:id", async (req, res) => {
  try {
    const Students = await Student.find({ instructor: req.params.id }).populate(
      "instructor"
    );
    res.status(200).json(Students);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
