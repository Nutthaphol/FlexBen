const db = require("../models");
const Insurance = db.Insurance;

exports.allInsurance = (req, res) => {
  try {
    res.status(200).send(Insurance);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
