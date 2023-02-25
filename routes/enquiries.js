const router = require("express").Router();
const Enquirie = require("../model/Enquirie");
const { verifyAdmin } = require("../MiddleWare/Verify");


//get All Enquirie
router.get("/all", verifyAdmin, async (req, res) => {
  try {
    const Enquiries = await Enquirie.find({});

    res.status(200).json({data:Enquiries});
  } catch (err) {
    res.status(500).json(err);
  }
});

//create new Enquirie

router.post(
  "/create",
    verifyAdmin,

   async (req, res) => {
    try {
      const email = req.body.enquirie.email;
      const userEmail = await Enquirie.findOne({email})
      if(userEmail) return res.status(400).json({msg: "This email already exists."})


      const newEnquire= new Enquirie(req.body.enquirie);
      const SaveEnquire= await newEnquire.save();
      res.status(200).json({ enquirie: SaveEnquire, msg: "create Successfully" });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  }
);
//Get Unique Enquirie

router.get("/:id", verifyAdmin,async (req, res) => {
  try {
    const enquirie = await Enquirie.findOne({ _id: req.params.id });
    res.status(200).json(enquirie);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Delete enquirie

router.delete("/:id", verifyAdmin, async (req, res) => {
  try {

      await Enquirie.findByIdAndDelete({ _id: req.params.id });
      res.status(200).json({ msg: "Enquirie Deleted" });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});


router.put('/:id'   ,verifyAdmin,async(req,res)=>{
  try {
    const enquirie = await Enquirie.findByIdAndUpdate(req.params.id, {
      $set: req.body.enquirie,
    });
    res.status(200).json({msg:"successfully updated" ,data:enquirie});
  } catch (err) {
    return res.status(500).json({msg:err});
  }
})

module.exports = router;
