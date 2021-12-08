import deliveryService from "../services/delivery.service";
import { DELIVERY_FETCHING, DELIVERY_FAILED, DELIVERY_SUCCESS } from "./types";

export const getAllDelivery = () => async (dispatch) => {
  try {
    const res = await deliveryService.getAllDelivery();
    if (res) {
      dispatch({
        type: DELIVERY_SUCCESS,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: DELIVERY_FAILED,
    });
    console.log(err);
  }
};
