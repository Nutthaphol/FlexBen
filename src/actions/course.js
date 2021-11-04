import { COURSE_FETCHING, COURSE_FAILED, COURSE_SUCCESS,
  COURSEITEM_FETCHING, COURSEITEM_FAILED, COURSEITEM_SUCCESS } from "./types";

import CourseService from "../services/course.service";

export const getAllCourses = () => async (dispatch) => {
  try {
    dispatch({
      type: COURSE_FETCHING,
    });
    const res = await CourseService.getAllCourses();
    if (res) {
      dispatch({
        type: COURSE_SUCCESS,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: COURSE_FAILED,
    });
    console.log(err);
  }
};

export const getCourse = (id) => async (dispatch) => {
  try {
    dispatch({
      type: COURSEITEM_FETCHING,
    });
    const res = await CourseService.getCourse(id);
    if (res) {
      dispatch({
        type: COURSEITEM_SUCCESS,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: COURSEITEM_FAILED,
    });
    console.log(err);
  }
};
