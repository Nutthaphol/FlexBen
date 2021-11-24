import { TRAVEL_FETCHING, TRAVEL_FAILED, TRAVEL_SUCCESS } from "./types";

import travelService from "../services/travel.service";

export const getAllTravel = () => async (dispatch) => {
  try {
    const res = await travelService.getAllTravel();
    if (res) {
      dispatch({
        type: TRAVEL_SUCCESS,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: TRAVEL_FAILED,
    });
    console.log(err);
  }
};
