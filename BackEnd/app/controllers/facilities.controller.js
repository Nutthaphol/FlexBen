const db = require("../models");
const facilities = db.facilities;

exports.allFacilities = (req, res) => {
  try {
    res.status(200).send(facilities);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
