const db = require("../models");
const travel = db.travel;

exports.allTravel = (req, res) => {
  try {
    res.status(200).send(travel);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.detailTravel = (req, res) => {
  try {
    const id = req.params.id;
    const data = travel.find((item) => item.id == id);
    if (data) {
      res.status(200).send(data);
    } else {
      res.status(404).send({ message: "Travel not fount" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
