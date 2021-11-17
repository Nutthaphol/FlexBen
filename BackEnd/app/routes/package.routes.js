const { authJwt } = require("../middleware");
const packageController = require("../controllers/package.controller");

module.exports = (app) => {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/package", [authJwt.verifyToken], packageController.allPackage);
  app.get(
    "/api/package/:id",
    [authJwt.verifyToken],
    packageController.detailPackage
  );
};
