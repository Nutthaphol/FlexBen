const db = require("../models");
const health = db.health;

exports.getHealthProfile = (req, res) => {
  const data = health.find((item) => item.userId == req.params.id);
  try {
    if (data) {
      res.status(200).send(data);
    } else {
      res.status(404).send({ message: "health profile not found" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
