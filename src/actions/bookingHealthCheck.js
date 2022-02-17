import bookingHealthCheckService from "../services/bookingHealthCheck.service";
import {
  BOOKINGHEALTHCHECK_FETCHING,
  BOOKINGHEALTHCHECK_FAILED,
  BOOKINGHEALTHCHECK_SUCCESS,
} from "./types";

export const getBookingHealthCheckbyId = (id) => async (dispatch) => {
  try {
    const res = await bookingHealthCheckService.getBookingHealthCheckById(id);
    if (res) {
      dispatch({
        type: BOOKINGHEALTHCHECK_SUCCESS,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: BOOKINGHEALTHCHECK_FAILED,
    });
    console.log(err);
  }
};
