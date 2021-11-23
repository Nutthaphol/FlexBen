import {
  MAINCATEGORY_FETCHING,
  MAINCATEGORY_FAILED,
  MAINCATEGORY_SUCCESS,
} from "../actions/types";

const initialState = {
  result: null,
  isFetching: false,
  isError: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case MAINCATEGORY_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false };
    case MAINCATEGORY_FAILED:
      return { ...state, result: null, isFetching: false, isError: true };
    case MAINCATEGORY_SUCCESS:
      return { ...state, result: payload, isFetching: false, isError: false };
    default:
      return state;
  }
}
