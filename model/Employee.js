const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 3,
      max: 20,
    },
    lastName: {
      type: String,
      required: true,
      min: 3,
      max: 20,
    },
    middleName: {
      type: String,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    telephone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    streetName: {
      type: String,
    },
    city: {
      type: String,
    },
    county: {
      type: String,
    },
    postCode: {
      type: String,
    },
    nationalInsuranceNo: {
      type: String,
    },
    locationBased: {
      type: String,
    },
    areas: {
      type: String,
    },
    previousExperience: {
      type: String,
    },
    jobRole: {
      type: String,
    },
    holidayEntitlement: {
      type: String,
    },
    breakEntitlement: {
      type: String,
    },
    sickDays: {
      type: String,
    },
    coverDays: {
      type: String,
    },
    shiftRota: {
      type: String,
    },
    referrals: {
      type: String,
    },
    languageSpoken: {
      type: String,
    },
    extraQualification: {
      type: String,
    },

    gender: {
      type: Number,
        enum: [0,1,2]
    },
    privateNotes: {
      type: String,
    },
    complaints: {
      type: String,
    },
    probationPeriod: {
      type: String,
    },
    contractStartDate: {
      type: String,
    },
    contractExpiryDate: {
      type: String,
    },
    contractCopyImg: {
      type: Array,
    },
    curriculumValueImg: {
      type: Array,
    },
    loans: {
      type: String,
    },
    startPaymentDate: {
      type: String,
    },
    endPaymentDate: {
      type: String,
    },
      jobHours: {
      type: Number,
    },
    dateOfBirth: {
      type: String,
    },
    curriculumVitae: {
      type: String,
    },
  },

  {
    timestamps: true,
  }
);

const Employee =
  mongoose.models.User || mongoose.model("Employee", EmployeeSchema);

module.exports = Employee;

/*
* Name \\ text
Sir name \\ text //
Phone number // number //
Date of birth // text //
Emile address//text //
Address //text //
Street name //text //
City //text //
County/ /text //
Postcode //text
National insurance number//text //
Location based //te xt  //
*
* Areas//text //
Previous Experience // text //
Job Role // text //
Curriculum Vitae // images
Contract copy // images
Holiday Entitlement // text //
Break entitlement // text //
Sick Days//text //
Cover Days // text //
Shift rota//text //
Referrals//text //
Extra Qualification//text //
Language Spoken//text //
Male/female//text //
********************Part time/full time//text
Private notice//text //
Complaints//text //
Probation period//text //
Contract start date?//text
Contract expiry date//text
Loans//text
Start payment date//text
End payment date//text
* */
