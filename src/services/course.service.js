import { httpClient } from "./httpClient";

const getAllCourses = () => {
  return httpClient.get("courses");
};

const getCourse = (id) => {
  return httpClient.get("courses/" + id);
};

export default {
    getAllCourses,
    getCourse
};
