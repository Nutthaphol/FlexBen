const db = {};

db.users = require("../models/user.model.js");
db.courses = require("../models/course.model.js");
db.departments = require("../models/department.model.js");
db.Insurance = require("../models/insurance.model.js");
db.item = require("../models/item.model.js");
db.shopCategory = require("../models/shopCategory.model.js");
db.mainCategory = require("../models/mainCategory.model.js");
db.package = require("../models/package.model");
db.review = require("../models/review.model");

module.exports = db;
