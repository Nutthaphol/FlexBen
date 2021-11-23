import { ITEM_FETCHING, ITEM_FAILED, ITEM_SUCCESS } from "./types";

import itemService from "../services/item.service";

export const getAllItem = () => async (dispatch) => {
  try {
    const res = await itemService.getAllItem();
    if (res) {
      dispatch({
        type: ITEM_SUCCESS,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: ITEM_FAILED,
    });
    console.log(err);
  }
};
