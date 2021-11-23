const { authJwt } = require("../middleware");
const shopCategoryController = require("../controllers/shopCategory.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/shopCategory",
    [authJwt.verifyToken],
    shopCategoryController.allShopCategory
  );
};
