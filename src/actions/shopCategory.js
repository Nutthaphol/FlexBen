import {
  SHOPCATEGORY_FETCHING,
  SHOPCATEGORY_FAILED,
  SHOPCATEGORY_SUCCESS,
} from "./types";

import ShopCategoryService from "../services/shopCategory.service";

export const getAllShopCategory = () => async (dispatch) => {
  try {
    dispatch({
      type: SHOPCATEGORY_FETCHING,
    });
    const res = await ShopCategoryService.getAllShopCategory();
    if (res) {
      dispatch({
        type: SHOPCATEGORY_SUCCESS,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: SHOPCATEGORY_FAILED,
    });
    console.log(err);
  }
};
