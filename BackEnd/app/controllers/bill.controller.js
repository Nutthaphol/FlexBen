const db = require("../models");
const Bill = db.bill;

exports.getBillHistoryById = (req, res) => {
  try {
    const data = Bill.filter((item) => item.sender == req.params.id);
    if (data) {
      res.status(200).send(data);
    } else {
      res.status(200).send({ message: "Bill by id not found." });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.getBillHistory = (req, res) => {
  try {
    const data = Bill;
    if (data) {
      res.status(200).send(data);
    } else {
      res.status(200).send({ message: "Bill not found." });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
