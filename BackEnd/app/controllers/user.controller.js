const db = require("../models");
const Users = db.users;

exports.userProfile = (req, res) => {
    try {
      let result = Users.find((user) => user.id == req.params.id);
  
      if (result) {
        res.status(200).send(result);
      } else {
        return res.status(404).send({ message: "User Not found." });
      }
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  
};

exports.allUser = (req, res) => {
  try {
    res.status(200).send(Users);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }

};