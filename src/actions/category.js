import { CATEGORY_FETCHING, CATEGORY_FAILED, CATEGORY_SUCCESS } from "./types";

import CategoryService from "../services/category.service";

export const getCategory = () => async (dispatch) => {
  try {
    dispatch({
      type: CATEGORY_FETCHING,
    });
    const res = await CategoryService.getCategory();
    if (res) {
      dispatch({
        type: CATEGORY_SUCCESS,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: CATEGORY_FAILED,
    });
    console.log(err);
  }
};
