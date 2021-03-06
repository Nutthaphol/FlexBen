const controller = require("../controllers/item.controller");
const { authJwt } = require("../middleware");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/getAllItem", [authJwt.verifyToken], controller.allItem);
  app.get("/api/item/:id", [authJwt.verifyToken], controller.detailItem);
};
