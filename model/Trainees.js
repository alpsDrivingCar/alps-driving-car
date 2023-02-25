const mongoose = require("mongoose");

const TraineeSchema = new mongoose.Schema(
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
    address: {
      type: String,
      required: true,
    },
    streetName: {
      type: String,
    },

    county: {
      type: String,
    },
    postCode: {
      type: String,
    },
    drivingLicencesNo: {
      type: String,
    },
    city: {
      type: String,
    },
    ADINo: {
      type: String,
    },
    locationBased: {
      type: String,
    },
    areasCovered: {
      type: String,
    },
    trainerExperience: {
      type: String,
    },
    trainerPassRate: {
      type: String,
    },
    privateNotes: {
      type: String,
    },
    pointsOnLicence: {
      type: String,
    },
    contractStartDate: {
      type: String,
    },
    contractExpiryDate: {
      type: String,
    },
    complaints: {
      type: String,
    },
    probationPeriod: {
      type: String,
    },
    referrals: {
      type: String,
    },
    ADILicenceStartingDate: {
      type: String,
    },
    ADINO: {
      type: String,
    },

    standardCheckTrainingHours: {
      type: String,
    },
    standardCheckPassDate: {
      type: String,
    },
    orditPassDate: {
      type: String,
    },
    orditTrainingHours: {
      type: String,
    },
    orditLicenceStartingDate: {
      type: String,
    },
    orditLicenceExpiryDate: {
      type: String,
    },
    dbsCheckDate: {
      type: String,
    },
    extraQualification: {
      type: String,
    },

    languageSpoken: {
      type: String,
    },

    gapsInBetweenLessons: {
      type: String,
    },
    gender: {
      type: Number,
        enum: [0,1,2]
    },
    jobHours: {
      type: String,
    },
    dualControls: {
      type: String,
    },
    carWrapping: {
      type: String,
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

    email: {
      type: String,
      required: true,
      unique: true,
    },

    phoneNumber: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: String,
    },
    appProgress: {
      type: String,
    },
    ADIimage: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

const Trainee =
  mongoose.models.User || mongoose.model("Trainee", TraineeSchema);

module.exports = Trainee;
