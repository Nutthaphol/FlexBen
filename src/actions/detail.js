import { DETAIL_FETCHING, DETAIL_FAILED, DETAIL_SUCCESS } from "./types";

import detailService from "../services/detail.service";

export const getDetail = (id) => async (dispatch) => {
  try {
    const res = await detailService.getDetail(id);
    if (res) {
      dispatch({
        type: DETAIL_SUCCESS,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: DETAIL_FAILED,
    });
    console.log(err);
  }
};
