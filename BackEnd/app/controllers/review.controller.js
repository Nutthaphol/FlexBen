const db = require("../models");
const review = db.review;

const getAllReview = (req, res) => {
  try {
    if (review) {
      res.status(200).send(review);
    } else {
      res.status(404).send({ message: "review not fount" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.getAllReview = getAllReview;
