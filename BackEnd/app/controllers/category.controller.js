const db = require("../models");
const Category = db.category;

exports.allCategory = (req, res) => {
  try {
    res.status(200).send(Category);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
