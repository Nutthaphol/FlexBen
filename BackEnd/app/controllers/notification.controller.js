const db = require("../models");
const notification = db.notification;

exports.getNotification = (req, res) => {
  try {
    if (notification) {
      res.status(200).send(notification);
    } else {
      res.status(404).send({ message: "Notification not found" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
