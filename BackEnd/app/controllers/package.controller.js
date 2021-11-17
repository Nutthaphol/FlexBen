const db = require("../models");
const package = db.package;

exports.allPackage = (req, res) => {
  try {
    if (package) {
      res.status(200).send(package);
    } else {
      res.status(404).send({ message: "package not fould" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.detailPackage = (req, res) => {
  try {
    const id = req.params.id;
    const data = package.find((item) => item.id == id);
    if (data) {
      res.status(200).send(data);
    } else {
      res.status(404).send({ message: "Package not fount" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
