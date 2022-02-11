import hospitalService from "../services/hospital.service";
import { HOSPITAL_FETCHING, HOSPITAL_FAILED, HOSPITAL_SUCCESS } from "./types";

export const getHospitalPackage = (id) => async (dispatch) => {
  try {
    const res = await hospitalService.getAllHospital();
    if (res) {
      dispatch({
        type: HOSPITAL_SUCCESS,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: HOSPITAL_FAILED,
    });
    console.log(err);
  }
};
