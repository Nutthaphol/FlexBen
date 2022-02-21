const db = require("../models");
const bookingHealthCheck = db.bookingHealthCheck;

exports.getBookingHistoryById = (req, res) => {
  const result = bookingHealthCheck.filter(
    (item) => item.userId == req.params.id
  );

  try {
    if (result) {
      res.status(200).send(result);
    } else {
      res.status(404).send({ message: "Booking history not found." });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.getAllBooking = (req, res) => {
  const result = bookingHealthCheck;
  try {
    if (result) {
      res.status(200).send(result);
    } else {
      res.status(404).send({ message: "Booking not found." });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
