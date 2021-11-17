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

    if (data) {
      res.status(200).send(data);
    } else {
      res.status(404).send({ message: "Insurance not fount" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
