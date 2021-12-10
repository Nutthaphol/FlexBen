import {
  FACILITIES_FETCHING,
  FACILITIES_FAILED,
  FACILITIES_SUCCESS,
} from "./types";

import facilitiesService from "../services/facilities.service";

export const getAllFacilities = (id) => async (dispatch) => {
  try {
    const res = await facilitiesService.getAllFacilities(id);
    if (res) {
      dispatch({
        type: FACILITIES_SUCCESS,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: FACILITIES_FAILED,
    });
    console.log(err);
  }
};
