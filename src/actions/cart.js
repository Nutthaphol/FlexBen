import { CART_SUCCESS, CART_FAIL } from "./types";

export const postCart = (data) => (dispatch) => {
  if (data) {
    const check = localStorage.getItem("cart");
    if (check) {
      localStorage.removeItem("cart");
    }
    localStorage.setItem("cart", JSON.stringify(data));
  }
};
