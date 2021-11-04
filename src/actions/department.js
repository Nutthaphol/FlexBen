import { DEPARTMENT_FETCHING, DEPARTMENT_FAILED, DEPARTMENT_SUCCESS } from "./types";

import DepartmentService from "../services/department.service";

export const getDepartment = () => async (dispatch) => {
  try {
    dispatch({
      type: DEPARTMENT_FETCHING,
    });
    const res = await DepartmentService.getDepartment();
    if (res) {
      dispatch({
        type: DEPARTMENT_SUCCESS,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: DEPARTMENT_FAILED,
    });
    console.log(err);
  }
};
