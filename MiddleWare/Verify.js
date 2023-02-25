const jwt = require("jsonwebtoken");

function verifyAdmin(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json("access Denied");
  }
  try {
    const verify = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verify;
    next();
  } catch (err) {
    res.status(404).json("invalid Token");
  }
}

function verifySupervisor(req, res, next) {
  if (req.user.isSupervisor === false) {
    return res
      .status(403)
      .json({ msg: "You don't have permission to edit admin" });
  }
  next();
}

module.exports = {
  verifyAdmin,
  verifySupervisor,
};
