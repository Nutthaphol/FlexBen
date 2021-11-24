const db = require("../models");
const TravelCategory = db.travelCategory;

exports.allTravelCategory = (req, res) => {
  try {
    res.status(200).send(TravelCategory);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
