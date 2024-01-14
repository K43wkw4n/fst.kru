import { createFormData, requests } from "./agent";

export const Branchs = {
  getBranch: () => requests.get("Branch/GetBranch"),
  getBranchById: (id: number) =>
    requests.get(`Branch/GetBranchById?branchId=${id}`),
  createUpdateBranch: (values: any) =>
    requests.post("Branch/CreateUpdateBranch", createFormData(values)),
  removeBranch: (id: number) =>
    requests.delete(`Branch/RemoveBranch?branchId=${id}`),

  //--------------------------------------------------systemSettings----------------------------------------------

  getSystemSettingByBranch: (id: number) =>
    requests.get(`Branch/GetSystemSettingsByBranch?branchId=${id}`),
  createUpdateSystemSettings: (values: any) =>
    requests.post("Branch/CreateUpdateSystemSettings", createFormData(values)),

  //--------------------------------------------------slideShow----------------------------------------------

  getSlideShowById: (id: number) =>
    requests.get(`Branch/GetSlideShowById?branchId=${id}`),
  createUpdateSlideShow: (values: any) =>
    requests.post("Branch/CreateUpdateSlideShow", createFormData(values)),
  removeSlideShow: (id: number) =>
    requests.delete(`Branch/RemoveSlideShow?slideShowId=${id}`),

  //--------------------------------------------------weLearn----------------------------------------------

  getWeLearnById: (id: number) =>
    requests.get(`Branch/GetWeLearn?branchId=${id}`),
  createUpdateWeLearn: (values: any) =>
    requests.post("Branch/CreateUpdateWeLearn", createFormData(values)),
  isUsedWeLearn: (id: number) =>
    requests.onlyPost(`Branch/IsUsedWeLearn?weLearnId=${id}`),
  removeWeLearn: (id: number) =>
    requests.delete(`Branch/RemoveWeLearn?weLearnId=${id}`),

  //--------------------------------------------------news----------------------------------------------

  getNewsById: (id: number) =>
    requests.get(`Branch/GetNewsById?branchId=${id}`),
  createUpdateNews: (values: any, formfiles: any) => {
    const data = createFormData(values);

    for (var formfile of formfiles) {
      data.append("formfiles", formfile.originFileObj);
      console.log("sand formfile", formfile);
    }

    console.log("sand data", data);
    console.log("sand formfiles", formfiles);

    return requests.post("Branch/CreateUpdateNews", data);
  },
  removeNews: (id: number) => requests.delete(`Branch/RemoveNews?newsId=${id}`),

  removeNewsPhoto: (id: number) =>
    requests.delete(`Branch/RemoveNewsPhoto?newsPhotoId=${id}`),

  isUsedNews: (id: number) =>
    requests.onlyPost(`Branch/IsUsedNews?newsId=${id}`),

  //--------------------------------------------------curriculum----------------------------------------------

  getCurriculumById: (id: number) =>
    requests.get(`Branch/GetCurriculumById?branchId=${id}`),
  createUpdateCurriculum: (values: any) =>
    requests.post("Branch/CreateUpdateCurriculum", values),
  uploadFile: (values: any) =>
    requests.post("Branch/UploadFile", createFormData(values)),
  removeCurriculum: (id: number) =>
    requests.delete(`Branch/RemoveCurriculum?curriculumId=${id}`),
  removeSubSubjectGroup: (id: number) =>
    requests.delete(`Branch/RemoveSubSubjectGroup?id=${id}`),
  removeSubjectGroup: (id: number) =>
    requests.delete(`Branch/RemoveSubjectGroup?id=${id}`),
  removeGeneralTopic: (id: number) =>
    requests.delete(`Branch/RemoveGeneralTopic?id=${id}`),
  removeSubGeneralTopic: (id: number) =>
    requests.delete(`Branch/RemoveSubGeneralTopic?id=${id}`),
};
