const db = require("./../models");
const insuranceCategory = db.insuranceCategory;

exports.allInsuranceCategory = (req, res) => {
  try {
    res.status(200).send(insuranceCategory);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
