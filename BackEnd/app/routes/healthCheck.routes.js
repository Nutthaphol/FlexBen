const controller = require("../controllers/healthCheck.controller");
const { authJwt } = require("../middleware");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/healthCheck/getHealthCheckUser/:id",
    [authJwt.verifyToken],
    controller.getHealthCheckUser
  );
  app.get(
    "/api/healthCheck/getAllHealthCheck",
    [authJwt.verifyToken],
    controller.getAllHealthCheck
  );
};
