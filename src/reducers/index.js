import { combineReducers } from "redux";
import auth from "./auth";
import userProfile from "./user-profile";
import users from "./user";
import course from "./course";
import department from "./department";
import courseItem from "./course-item";
import insurance from "./insurance";
import shopCategory from "./shopCategory";
import item from "./item";
import detail from "./detail";
import package_ from "./package";
import mainCategory from "./mainCategory";
import travelCategory from "./travelCategory";
import travel from "./travel";
import cart from "./cart";
import history from "./history";
import delivery from "./delivery";
import facilities from "./facilities";
import insuranceCategory from "./insuranceCategory";
import navigation from "./navigation";
import notification from "./notification";
import health from "./health";
import rightTreatment from "./rightTreatment";
import healthCheck from "./healthCheck";
import healthCheckCategory from "./healthCheckCategory";
import treatmentCategory from "./treatmentCategory";
import bill from "./bill";
import hospital from "./hospital";

const appReducer = combineReducers({
  auth,
  users,
  userProfile,
  course,
  department,
  courseItem,
  insurance,
  item,
  shopCategory,
  detail,
  package_,
  mainCategory,
  travelCategory,
  travel,
  cart,
  history,
  delivery,
  facilities,
  insuranceCategory,
  navigation,
  notification,
  health,
  rightTreatment,
  healthCheck,
  healthCheckCategory,
  treatmentCategory,
  bill,
  hospital,
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export default rootReducer;
