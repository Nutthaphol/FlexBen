import healthCheckService from "../services/healthCheck.service";
import {
  HEALTHCHECK_FETCHING,
  HEALTHCHECK_FAILED,
  HEALTHCHECK_SUCCESS,
} from "./types";

export const getAllHealthCheck = () => async (dispatch) => {
  try {
    const res = await healthCheckService.getAllHealthCheck();
    if (res) {
      dispatch({
        type: HEALTHCHECK_SUCCESS,
        payload: res,
      });
    }
  } catch (err) {
    dispatch({
      type: HEALTHCHECK_FAILED,
    });
    console.log(err);
  }
};
