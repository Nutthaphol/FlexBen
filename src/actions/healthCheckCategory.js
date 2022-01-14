import healthCheckCategoryService from "../services/healthCheckCategory.service";
import {
  HEALTHCHECKCATEGORY_FETCHING,
  HEALTHCHECKCATEGORY_FAILED,
  HEALTHCHECKCATEGORY_SUCCESS,
} from "./types";

export const getHealthCheckCategory = () => async (dispatch) => {
  try {
    const res = await healthCheckCategoryService.getHealthCheckCategory();
    if (res) {
      dispatch({
        type: HEALTHCHECKCATEGORY_SUCCESS,
        payload: res,
      });
    }
  } catch (err) {
    dispatch({
      type: HEALTHCHECKCATEGORY_FAILED,
    });
    console.log(err);
  }
};
