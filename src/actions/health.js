import { HEALTH_FETCHING, HEALTH_FAILED, HEALTH_SUCCESS } from "./types";
import healthServices from "../services/health.services";

export const getAllHealthInfo = () => async (dispatch) => {
  try {
    const res = await healthServices.getAllHealth();
    if (res) {
      dispatch({
        type: HEALTH_SUCCESS,
        payload: res,
      });
    }
  } catch (err) {
    dispatch({
      type: HEALTH_FAILED,
    });
    console.log(err);
  }
};
