import {
  BOOKINGHEALTHCHECK_FETCHING,
  BOOKINGHEALTHCHECK_FAILED,
  BOOKINGHEALTHCHECK_SUCCESS,
} from "../actions/types";

const initialState = {
  result: null,
  isFetching: false,
  isError: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case BOOKINGHEALTHCHECK_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false };
    case BOOKINGHEALTHCHECK_FAILED:
      return { ...state, result: null, isFetching: false, isError: true };
    case BOOKINGHEALTHCHECK_SUCCESS:
      return { ...state, result: payload, isFetching: false, isError: false };
    default:
      return state;
  }
}
