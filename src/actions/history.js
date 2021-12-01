import { HISTORY_FETCHING, HISTORY_FAILED, HISTORY_SUCCESS } from "./types";

import historyService from "../services/history.service";

export const getHistoryProfile = (id) => async (dispatch) => {
  try {
    const res = await historyService.getHistoryProfile(id);
    if (res) {
      dispatch({
        type: HISTORY_SUCCESS,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: HISTORY_FAILED,
    });
    console.log(err);
  }
};
