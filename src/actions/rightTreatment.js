import rightTreatmentService from "../services/rightTreatment.service";
import {
  RIGHTTREATMENT_FETCHING,
  RIGHTTREATMENT_FAILED,
  RIGHTTREATMENT_SUCCESS,
} from "./types";

export const getAllRightTreatment = () => async (dispatch) => {
  try {
    const res = await rightTreatmentService.getAllRightTreatment();
    if (res) {
      dispatch({
        type: RIGHTTREATMENT_SUCCESS,
        payload: res,
      });
    }
  } catch (err) {
    dispatch({
      type: RIGHTTREATMENT_FAILED,
    });
    console.log(err);
  }
};
