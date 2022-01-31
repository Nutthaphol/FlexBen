const db = require("../models");
const hospital = db.hospital;

exports.getAllHospital = (req, res) => {
  try {
    const data = hospital;
    if (data) {
      res.status(200).send(data);
    } else {
      res.status(404).send({ message: " hospital not found" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.getHospitalById = (req, res) => {
  try {
    const data = hospital.find((item) => item.id == req.params.id);
    if (data) {
      res.status(200).send(data);
    } else {
      res.status(404).send({ message: " hospital not found" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
