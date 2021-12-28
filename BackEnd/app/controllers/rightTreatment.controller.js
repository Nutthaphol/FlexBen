const db = require("../models");
const rightTreatment = db.rightTreatment;

exports.getRightTreatment = (req, res) => {
  const data = rightTreatment;
  try {
    if (data) {
      res.status(200).send(data);
    } else {
      res.status(404).send({ message: "right to treatment not found" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
