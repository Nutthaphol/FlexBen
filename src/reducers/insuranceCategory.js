import {
  INSURANCECATEGORY_FETCHING,
  INSURANCECATEGORY_FAILED,
  INSURANCECATEGORY_SUCCESS,
} from "../actions/types";

const initialState = {
  result: null,
  isFetching: false,
  isError: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case INSURANCECATEGORY_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false };
    case INSURANCECATEGORY_FAILED:
      return { ...state, result: null, isFetching: false, isError: true };
    case INSURANCECATEGORY_SUCCESS:
      return { ...state, result: payload, isFetching: false, isError: false };
    default:
      return state;
  }
}
