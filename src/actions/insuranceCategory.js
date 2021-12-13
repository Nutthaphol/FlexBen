import {
  INSURANCECATEGORY_FETCHING,
  INSURANCECATEGORY_FAILED,
  INSURANCECATEGORY_SUCCESS,
} from "./types";

import insuranceCategoryService from "../services/insuranceCategory.service";

export const getAllInsuranceCategory = () => async (dispatch) => {
  try {
    dispatch({
      type: INSURANCECATEGORY_FETCHING,
    });
    const res = await insuranceCategoryService.getAllInsuranceCategory();
    if (res) {
      dispatch({
        type: INSURANCECATEGORY_SUCCESS,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: INSURANCECATEGORY_FAILED,
    });
    console.log(err);
  }
};
