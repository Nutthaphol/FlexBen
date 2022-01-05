const db = {};

db.users = require("../models/user.model.js");
db.courses = require("../models/course.model.js");
db.departments = require("../models/department.model.js");
db.Insurance = require("../models/insurance.model.js");
db.item = require("../models/item.model.js");
db.shopCategory = require("../models/shopCategory.model.js");
db.mainCategory = require("../models/mainCategory.model.js");
db.travelCategory = require("../models/travelCategory.model.js");
db.package = require("../models/package.model");
db.review = require("../models/review.model");
db.travel = require("../models/travel.model");
db.history = require("../models/history.model");
db.delivery = require("../models/delivery.model");
db.facilities = require("../models/facilities.model");
db.insuranceCategory = require("../models/insuranceCategory.model");
db.Icons = require("../models/Icons.model");
db.health = require("../models/health.model");
db.healthCheck = require("../models/healthCheck.model");
db.healthCheckCategory = require("../models/healthCheckCategory.model");
db.rightTreatment = require("../models/rightTreatment.model");
db.treatmentCategory = require("../models/treatmentCategory.model");
db.notification = require("../models/notification.model");

module.exports = db;
