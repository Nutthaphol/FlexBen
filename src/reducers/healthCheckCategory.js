import {
  HEALTHCHECKCATEGORY_FETCHING,
  HEALTHCHECKCATEGORY_FAILED,
  HEALTHCHECKCATEGORY_SUCCESS,
} from "../actions/types";

const initialState = {
  result: null,
  isFetching: false,
  isError: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case HEALTHCHECKCATEGORY_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false };
    case HEALTHCHECKCATEGORY_FAILED:
      return { ...state, result: null, isFetching: false, isError: true };
    case HEALTHCHECKCATEGORY_SUCCESS:
      return { ...state, result: payload, isFetching: false, isError: false };
    default:
      return state;
  }
}
