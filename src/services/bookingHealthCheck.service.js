import { httpClient } from "./httpClient";

const getBookingHealthCheckById = (id) => {
  return httpClient.get("getBookingHealthCheckHistory/" + id);
};

export default {
  getBookingHealthCheckById,
};
