import { createFormData, requests } from "./agent";

export const CourseSpecification = {
  getAllCourseSpecifications: () =>
    requests.get("CourseSpecification/GetAllCourseSpecifications"),
  getCourseSpecificationByUser: () =>
    requests.get("CourseSpecification/GetCourseSpecificationsByUser"),
  getCourseSpecificationsById: (id: number) =>
    requests.get(
      `CourseSpecification/GetCourseSpecificationsById?branchId=${id}`
    ),
  createUpdateCategoryCourseS: (values: any) =>
    requests.post("CourseSpecification/CreateUpdateCategoryCourseS", values),
  uploadFile: (values: any) =>
    requests.post("CourseSpecification/UploadFile", createFormData(values)),
  removeCourseSpecification: (id: any) =>
    requests.delete(
      `CourseSpecification/RemoveCourseSpecification?courseId=${id}`
    ),

  //----------------------------------categoryCourseSpecification-------------------------------------//

  getCategoryCourseS: () =>
    requests.get("CourseSpecification/GetCategoryCourseS"),
  getCountCategoryCourseSpecification: () =>
    requests.get("CourseSpecification/GetCountCategoryCourseSpecification"),
  createUpdateCourseSpecification: (values: any) =>
    requests.post(
      "CourseSpecification/CreateUpdateCourseSpecification",
      values
    ),
  removeCategoryCourseS: (id: any) =>
    requests.delete(
      `CourseSpecification/RemoveCategoryCourseS?categoryCourseId=${id}`
    ),

  //----------------------------------subjects-------------------------------------//

  getSubjects: () => requests.get("CourseSpecification/GetSubjects"),
  createUpdateSubjects: (values: any) =>
    requests.post("CourseSpecification/CreateUpdateSubjects", values),
  removeSubjects: (id: any) =>
    requests.delete(`CourseSpecification/RemoveSubjects?subjectsId=${id}`),
};
