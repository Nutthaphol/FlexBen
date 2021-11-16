import { PACKAGE_FETCHING, PACKAGE_FAILED, PACKAGE_SUCCESS } from "./types";

import packageService from "../services/package.service";

export const getAllPackage = () => async (dispatch) => {
  try {
    const res = await packageService.getAllPackage();
    if (res) {
      dispatch({
        type: PACKAGE_SUCCESS,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: PACKAGE_FAILED,
    });
    console.log(err);
  }
};
