const router = require("express").Router();
const Admin = require("../model/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const { verifyAdmin, verifySupervisor } = require("../MiddleWare/Verify");

router.post(
  "/register",
  body("email").isEmail(),
  body("pass").isLength({ min: 6 }),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ msg: errors.array()[0].msg });
      }

      const {
        firstName,
        lastName,
        email,
        pass,
        isAdmin,
        isSupervisor,
        phoneNumber,
        imgUrl,
      } = req.body;

      const userEmail = await Admin.findOne({ email });
      if (userEmail)
        return res.status(400).json({ msg: "This email already exists." });

      const passwordHash = await bcrypt.hash(pass, 10);

      const newUser = new Admin({
        firstName,
        lastName,
        email,
        password: passwordHash,
        isAdmin,
        isSupervisor,
        phoneNumber,
        imgUrl,
      });
      await newUser.save();

      res.json({
        msg: "Register Success!",
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }
);

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Admin.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ msg: "this email is not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign(user.toJSON(), process.env.TOKEN_SECRET, {
        expiresIn: "1d",
      });
      const { password, ...others } = user._doc;
      others.token = token;
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 1 * 24 * 60 * 60 * 1000,
      });
      res.status(200).json({ msg: "loginSucsess", user: others });
    } else {
      res.status(400).json({ msg: " password Is Not Correct" });
    }
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.post("/logout", (req, res) => {
  try {
    res.cookie("token", null, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 0,
    });
    delete req.user;
    res.send("logout!!");
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
