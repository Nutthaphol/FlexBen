import {
  INSURANCE_FETCHING,
  INSURANCE_FAILED,
  INSURANCE_SUCCESS,
} from "./types";

import InsuranceService from "../services/insurance.service";

export const getAllInsurance = () => async (dispatch) => {
  try {
    const res = await InsuranceService.getInsurance();
    if (res) {
      dispatch({
        type: INSURANCE_SUCCESS,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: INSURANCE_FAILED,
    });
    console.log(err);
  }
};
