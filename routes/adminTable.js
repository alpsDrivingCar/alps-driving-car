const router = require("express").Router();
const AdminTable = require("../model/AdminTable");
const { verifyAdmin } = require("../MiddleWare/Verify");

//get All admin table
router.get("/all", async (req, res) => {
  try {
    const adminTable = await AdminTable.find({});

    res.status(200).json({ data: adminTable });
  } catch (err) {
    res.status(500).json(err);
  }
});

//create new admin table

router.post("/create", async (req, res) => {
  try {
    const newAdminTable = new AdminTable(req.body);
    const SaveAdminTable = await newAdminTable.save();
    res
      .status(200)
      .json({ adminTable: SaveAdminTable, msg: "create Successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Delete admin table

router.delete("/:id", verifyAdmin, async (req, res) => {
  try {
    await AdminTable.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({ msg: "Admin Table Deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
