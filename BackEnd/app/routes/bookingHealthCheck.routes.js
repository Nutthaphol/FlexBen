const { authJwt } = require("../middleware");
const controller = require("../controllers/bookingHealthCheck.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/getBookingHealthCheckHistory/:id",
    [authJwt.verifyToken],
    controller.getBookingHistoryById
  );
  app.get(
    "/api/admin/getAllBookingHealthCheck",
    [authJwt.verifyToken],
    controller.getAllBooking
  );
};
