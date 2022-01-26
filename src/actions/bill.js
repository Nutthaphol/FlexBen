import billService from "../services/bill.service";
import { BILL_FETCHING, BILL_FAILED, BILL_SUCCESS } from "./types";

export const getBillHistoryById = (id) => async (dispatch) => {
  try {
    const res = await billService.getBillHistoryById(id);
    if (res) {
      dispatch({
        type: BILL_SUCCESS,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: BILL_FAILED,
    });
    console.log(err);
  }
};
