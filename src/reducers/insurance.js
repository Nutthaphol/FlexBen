import {
  INSURANCE_FETCHING,
  INSURANCE_FAILED,
  INSURANCE_SUCCESS,
} from "../actions/types";

const initialState = {
  result: null,
  isFetching: false,
  isError: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case INSURANCE_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false };
    case INSURANCE_FAILED:
      return { ...state, result: null, isFetching: false, isError: true };
    case INSURANCE_SUCCESS:
      return { ...state, result: payload, isFetching: false, isError: false };
    default:
      return state;
  }
}
