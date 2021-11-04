import { combineReducers } from "redux";
import auth from "./auth";
import userProfile from "./user-profile";
import users from "./user";
import course from "./course";
import department from "./department";
import courseItem from "./course-item";
import insurance from "./insurance";
import category from "./category";

const appReducer = combineReducers({
  auth,
  users,
  userProfile,
  course,
  department,
  courseItem,
  insurance,
  category,
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export default rootReducer;
