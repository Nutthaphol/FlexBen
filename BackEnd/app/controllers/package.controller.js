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
