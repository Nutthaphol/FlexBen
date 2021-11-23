import {
  MAINCATEGORY_FETCHING,
  MAINCATEGORY_FAILED,
  MAINCATEGORY_SUCCESS,
} from "./types";

import mainCategoryService from "../services/mainCategory.service";

export const getAllMainCategory = () => async (dispatch) => {
  try {
    const res = await mainCategoryService.getAllMainCategory();
    if (res) {
      dispatch({
        type: MAINCATEGORY_SUCCESS,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: MAINCATEGORY_FAILED,
    });
    console.log(err);
  }
};
