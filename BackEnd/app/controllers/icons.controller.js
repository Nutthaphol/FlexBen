const db = require("../models");
const Icons = db.Icons;

exports.getIconsPackageClass = (req, res) => {
  try {
    const data = Icons.find((item) => item.group == "packageClass");

    console.log("data", data);
    if (data) {
      res.status(200).send(data);
    } else {
      res.status(404).send("Icons package class not found");
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
