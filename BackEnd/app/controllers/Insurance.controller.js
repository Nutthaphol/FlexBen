const db = require("../models");
const Insurance = db.Insurance;

exports.allInsurance = (req, res) => {
  try {
    res.status(200).send(Insurance);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.detailInsurance = (req, res) => {
  try {
    const id = req.params.id;
    const data = Insurance.find((item) => item.id == id);

    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
