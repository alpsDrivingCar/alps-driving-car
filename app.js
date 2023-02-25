const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
app.set("trust proxy", 1);
app.use(cookieParser());
app.use(cors({ credentials: true, origin: true }));
dotenv.config(dotenv);
const port = 4000;

const authRoutes = require("./routes/auth");
const TraineeRoutes = require("./routes/trainees");
const AdminRoutes = require("./routes/admin");
const EmployeeRoutes = require("./routes/employee");
const InstructorRoutes = require("./routes/Instructor");
const EnquirieRoutes = require("./routes/enquiries");
const StudnetRoutes = require("./routes/student");
const PercentageRoutes = require("./routes/percentage");
const AdminTableRoutes = require("./routes/adminTable");
const MailRoutes = require("./routes/mail");
const TestRoutes = require("./routes/traineeTable");
const TraineeDepartmentRoutes = require("./routes/traineeDepartment");

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/trainee", TraineeRoutes);
app.use("/api/admin", AdminRoutes);
app.use("/api/employee", EmployeeRoutes);
app.use("/api/instructor", InstructorRoutes);
app.use("/api/enquirie", EnquirieRoutes);
app.use("/api/student", StudnetRoutes);
app.use("/api/percentage", PercentageRoutes);
app.use("/api/admin-table", AdminTableRoutes);
app.use("/api/mail", MailRoutes);
app.use("/api/trainee-table", TestRoutes);
app.use("/api/trainee-department", TraineeDepartmentRoutes);

mongoose
  .connect(process.env.DATABASEURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((_) => {
    console.log("Connected!");
  })
  .catch((err) => {
    throw err;
  });

app.listen(process.env.PORT || port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
