const controller = require("../controllers/health.controller");
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
    "/api/health/getHealthProfile/:id",
    [authJwt.verifyToken],
    controller.getHealthProfile
  );

  app.get(
    "/api/health/getAllhealthInfo",
    [authJwt.verifyToken],
    controller.getAllHealthInfo
  );
};
