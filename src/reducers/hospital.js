import {
  HOSPITAL_FETCHING,
  HOSPITAL_FAILED,
  HOSPITAL_SUCCESS,
} from "../actions/types";

const initialState = {
  result: null,
  isFetching: false,
  isError: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case HOSPITAL_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false };
    case HOSPITAL_FAILED:
      return { ...state, result: null, isFetching: false, isError: true };
    case HOSPITAL_SUCCESS:
      return { ...state, result: payload, isFetching: false, isError: false };
    default:
      return state;
  }
}
