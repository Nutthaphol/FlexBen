const db = {};

db.users = require("../models/user.model.js");
db.courses = require("../models/course.model.js");
db.departments = require("../models/department.model.js");
db.Insurance = require("../models/insurance.model.js");
db.item = require("../models/item.model.js");
db.category = require("../models/category.model.js");
db.package = require("../models/package.model");

module.exports = db;
