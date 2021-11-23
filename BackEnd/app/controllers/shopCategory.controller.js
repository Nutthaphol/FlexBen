const db = require("../models");
const ShopCategory = db.shopCategory;

exports.allShopCategory = (req, res) => {
  try {
    res.status(200).send(ShopCategory);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
