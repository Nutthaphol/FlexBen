const db = require("../models");
const delivery = db.delivery;

exports.allDelivery = (req, res) => {
  try {
    res.status(200).send(delivery);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
