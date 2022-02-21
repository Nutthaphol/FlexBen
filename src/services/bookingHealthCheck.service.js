import { httpClient } from "./httpClient";

const getBookingHealthCheckById = (id) => {
  return httpClient.get("getBookingHealthCheckHistory/" + id);
};

const getAllBooingHealthCheck = () => {
  return httpClient.get("admin/getAllBookingHealthCheck");
};

export default {
  getBookingHealthCheckById,
  getAllBooingHealthCheck,
};
