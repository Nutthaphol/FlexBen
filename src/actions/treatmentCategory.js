import treatmentCategoryService from "../services/treatmentCategory.service";
import {
  TREATMENTCATEGORY_FETCHING,
  TREATMENTCATEGORY_FAILED,
  TREATMENTCATEGORY_SUCCESS,
} from "./types";

export const getTreatmentCategory = () => async (dispatch) => {
  try {
    dispatch({
      type: TREATMENTCATEGORY_FETCHING,
    });
    const res = await treatmentCategoryService.getTreatmentCategory();
    if (res) {
      dispatch({
        type: TREATMENTCATEGORY_SUCCESS,
        payload: res,
      });
    }
  } catch (err) {
    dispatch({
      type: TREATMENTCATEGORY_FAILED,
    });
    console.log(err);
  }
};
