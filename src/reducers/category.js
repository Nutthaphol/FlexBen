import {
  CATEGORY_FETCHING,
  CATEGORY_FAILED,
  CATEGORY_SUCCESS,
} from "../actions/types";

const initialState = {
  result: null,
  isFetching: false,
  isError: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CATEGORY_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false };
    case CATEGORY_FAILED:
      return { ...state, result: null, isFetching: false, isError: true };
    case CATEGORY_SUCCESS:
      return { ...state, result: payload, isFetching: false, isError: false };
    default:
      return state;
  }
}
