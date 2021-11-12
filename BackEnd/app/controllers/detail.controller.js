const db = require("../models");
const Detail = db.detail;

exports.userDetail = (req, res) => {
  try {
    let result = Detail.find((item) => item.userId == req.params.id);

    if (result) {
      res.status(200).send(result);
    } else {
      return res.status(404).send({ message: "Detail Not found." });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
