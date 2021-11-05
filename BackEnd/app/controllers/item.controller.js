const db = require("../models");
const item = db.item;

exports.allItem = (req, res) => {
  try {
    res.status(200).send(item);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
