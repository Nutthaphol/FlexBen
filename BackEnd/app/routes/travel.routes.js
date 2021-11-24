const controller = require("../controllers/travel.controller");
const { authJwt } = require("../middleware");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/getAllTravel", [authJwt.verifyToken], controller.allTravel);
  app.get("/api/travel/:id", [authJwt.verifyToken], controller.detailTravel);
};
