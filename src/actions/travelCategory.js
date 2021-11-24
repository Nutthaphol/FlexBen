import {
  TRAVELCATEGORY_FETCHING,
  TRAVELCATEGORY_FAILED,
  TRAVELCATEGORY_SUCCESS,
} from "./types";

import travelCategoryService from "../services/travelCategory.service";

export const getAllTravelCategory = () => async (dispatch) => {
  try {
    dispatch({
      type: TRAVELCATEGORY_FETCHING,
    });
    const res = await travelCategoryService.getAllTravelCategory();
    if (res) {
      dispatch({
        type: TRAVELCATEGORY_SUCCESS,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: TRAVELCATEGORY_FAILED,
    });
    console.log(err);
  }
};
