import {
  PACKAGE_FETCHING,
  PACKAGE_FAILED,
  PACKAGE_SUCCESS,
} from "../actions/types";

const initialState = {
  result: null,
  isFetching: false,
  isError: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case PACKAGE_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false };
    case PACKAGE_FAILED:
      return { ...state, result: null, isFetching: false, isError: true };
    case PACKAGE_SUCCESS:
      return { ...state, result: payload, isFetching: false, isError: false };
    default:
      return state;
  }
}
