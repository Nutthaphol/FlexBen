import {
  NOTIFICATION_FETCHING,
  NOTIFICATION_FAILED,
  NOTIFICATION_SUCCESS,
} from "./types";

import noficicationServices from "../services/noficication.services";

export const getNotification = () => async (dispatch) => {
  try {
    const res = await noficicationServices.getNotification();
    if (res) {
      dispatch({
        type: NOTIFICATION_SUCCESS,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: NOTIFICATION_FAILED,
    });
    console.log(err);
  }
};
