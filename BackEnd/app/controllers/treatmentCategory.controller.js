const db = require("../models");
const treatmentCategory = db.treatmentCategory;

exports.getTreatmentCategory = (req, res) => {
  try {
    if (treatmentCategory) {
      res.status(200).send(treatmentCategory);
    } else {
      res.status(404).send({ message: "treatment type not fount" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
