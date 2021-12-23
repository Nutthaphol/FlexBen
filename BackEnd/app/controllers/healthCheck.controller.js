const db = require("../models");
const healthCheck = db.healthCheck;

exports.getHealthCheckUser = (req, res) => {
  const data = healthCheck.find((item) => item.userId == req.params.id);

  try {
    if (data) {
      res.status(200).send(data);
    } else {
      res.status(404).send({ message: "healthcheck user not fount" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
