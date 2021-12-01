const db = require("../models");
const history = db.history;

exports.historyProfile = (req, res) => {
  const id = req.params.id;
  const data = history.find((item) => item.userId == id);
  try {
    if (data) {
      res.status(200).send(data);
    } else {
      res.status(404).send({ message: "history not fount" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
