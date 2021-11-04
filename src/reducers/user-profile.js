import {
  USERPROFILE_FETCHING,
  USERPROFILE_FAILED,
  USERPROFILE_SUCCESS,
} from "../actions/types";

const initialState = {
  result: null,
  isFetching: false,
  isError: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USERPROFILE_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false };
    case USERPROFILE_FAILED:
      return { ...state, result: null, isFetching: false, isError: true };
    case USERPROFILE_SUCCESS:
      return { ...state, result: payload, isFetching: false, isError: false };
    default:
      return state;
  }
}
