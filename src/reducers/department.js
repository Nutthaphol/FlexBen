import { DEPARTMENT_FETCHING, DEPARTMENT_FAILED, DEPARTMENT_SUCCESS } from "../actions/types";

const initialState = {
  result: null,
  isFetching: false,
  isError: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case DEPARTMENT_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false };
    case DEPARTMENT_FAILED:
      return { ...state, result: null, isFetching: false, isError: true };
    case DEPARTMENT_SUCCESS:
      return { ...state, result: payload, isFetching: false, isError: false };
    default:
      return state;
  }
};
