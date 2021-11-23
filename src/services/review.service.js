import { httpClient } from "./httpClient";

const getAllReviews = () => {
  const res = httpClient.get("review/getAllReviews");
  console.log("service ", res);
  return res;
};

export default {
  getAllReviews,
};
