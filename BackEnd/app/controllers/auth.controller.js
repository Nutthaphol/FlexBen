const db = require("../models");
const config = require("../config/auth.config");
const Users = db.users;

var jwt = require("jsonwebtoken");

exports.signin = (req, res) => {
  try {
    let result = Users.find((user) => user.username === req.body.username);

    if (result) {
      var passwordIsValid = req.body.password == result.password;

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      var token = jwt.sign({ id: result.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      var authorities = result.authorities;

      res.status(200).send({
        id: result.id,
        username: result.username,
        roles: authorities,
        image: result.image,
        accessToken: token,
      });
    } else {
      return res.status(404).send({ message: "User Not found." });
    }
  } catch (error) {
    res.status(500).send({ message: err.message });
  }
};
