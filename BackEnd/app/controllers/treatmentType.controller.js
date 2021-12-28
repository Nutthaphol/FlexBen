const db = require("../models");
const treatmentType = db.treatmentType;

exports.getTreatmentType = (req, res) => {
  try {
    if (treatmentType) {
      res.status(200).send(treatmentType);
    } else {
      res.status(404).send({ message: "treatment type not fount" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
