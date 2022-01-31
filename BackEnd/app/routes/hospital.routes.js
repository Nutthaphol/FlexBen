const controller = require("../controllers/hospital.controller");
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
    "/api/hospital/getAllHospitalList",
    [authJwt.verifyToken],
    controller.getAllHospital
  );
  app.get(
    "/api/hospital/getHospital/:id",
    [authJwt.verifyToken],
    controller.getHospitalById
  );
};
