import { CART_SUCCESS, CART_FAIL } from "../actions/types";

const cart = JSON.parse(localStorage.getItem("cart"));

const initialState = cart ? { cart } : { cart: [] };

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CART_SUCCESS:
      return {
        ...state,
        cart: payload.cart,
      };
    case CART_FAIL:
      return {
        ...state,
        cart: [],
      };

    default:
      return state;
  }
}
