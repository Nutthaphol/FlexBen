const db = require("../models");
const mainCategory = db.mainCategory;

exports.allMainCategory = (req, res) => {
  try {
    if (mainCategory) {
      res.status(200).send(mainCategory);
    } else {
      res.status(404).send({ message: "mainCategory not fould" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
