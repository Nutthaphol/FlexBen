const db = require("../models");
const healthCheckCategory = db.healthCheckCategory;

exports.getHealthCheckCategory = (req, res) => {
  try {
    if (healthCheckCategory) {
      res.status(200).send(healthCheckCategory);
    } else {
      res.status(404).send({ message: "healthCheck Category not found" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
