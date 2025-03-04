import { loginDto } from "../models/DTO/interfaceDto";
import { createFormData, requests } from "./agent";

export const Acounts = {
  getPrefixAndPosition: () => requests.get("Account/GetPrefixAndPosition"),
  getDeCodeToken: (token: string) =>
    requests.get(`Account/GetDecodeToken?token=${token}`),
  getCurrentUser: () => requests.get("Account/GetCurrentUser"),
  getAllPersonnel: () => requests.get("Account/GetAllUser"),
  login: (values: loginDto) => requests.post("Account/Login", values),
  register: (values: any) =>
    requests.post("Account/Register", createFormData(values)),

  //--------------------------------------------admin-----------------------------------------------//

  getAllAdminById: (id: number) =>
    requests.get(`Account/GetAllAdminById?branchId=${id}`),

  //--------------------------------------------personnel-----------------------------------------------//

  getPersonnelById: (id: number) =>
    requests.get(`Account/GetPersonnelById?branchId=${id}`),
  GetPersonnelAdminById: (id: number) =>
    requests.get(`Account/GetPersonnelAdminById?branchId=${id}`),
  updatePersonnel: (values: any) =>
    requests.post("Account/UpdatePersonnel", createFormData(values)),
  updateMyAccountPersonnel: (values: any) =>
    requests.post("Account/updateMyAccountPersonnel", values),
  isUsedUser: (id: number) =>
    requests.onlyPost(`Account/IsUsedUser?userId=${id}`),
  removeUser: (id: number) =>
    requests.delete(`Account/RemoveUser?userId=${id}`),

  //--------------------------------------------student-----------------------------------------------//

  getStudentById: (id: number) =>
    requests.get(`Account/GetStudentById?branchId=${id}`),
  createStudent: (values: any) =>
    requests.post("Account/CreateStudent", createFormData(values)),
  updateStudent: (values: any) =>
    requests.post("Account/UpdateStudent", createFormData(values)),
  updateMyAccountStudent: (values: any) =>
    requests.post("Account/UpdateMyAccountStudent", values),
  isUsedStudent: (id: number) =>
    requests.onlyPost(`Account/IsUsedStudent?studentId=${id}`),
  removeStudent: (id: number) =>
    requests.delete(`Account/RemoveStudent?studentId=${id}`),

  //--------------------------------------------user-----------------------------------------------//

  changePassword: (values: any) =>
    requests.post("Account/ChangePassword", values),
  updateImageUser: (values: any) =>
    requests.post("Account/UpdateImageUser", createFormData(values)),
  //--------------------------------------------job-----------------------------------------------//

  getJobHistoryByBranch: (id: number) =>
    requests.get(`Account/GetJobHistoryByBranch?branchId=${id}`),
  getJobHistoryDDByBranchByGroup: (id: number) =>
    requests.get(`Account/GetJobHistoryDDByBranchByGroup?branchId=${id}`),
  getJobHistoriesByName: (name: string) =>
    requests.get(`Account/getJobHistoriesByName?JobHistoryName=${name}`),
  getJobHistoryByBranchByGroupAll: (id: number) =>
    requests.get(`Account/GetJobHistoryByBranchByGroupAll?branchId=${id}`),
  getJobHistoryById: () => requests.get("Account/GetJobHistoryById"),
  getJobHistoryByUserId: (id: number) =>
    requests.get("Account/GetJobHistoryByUserId?userId=" + id),
  createUpdateJobHistory: (values: any) =>
    requests.post("Account/CreateUpdateJobHistory", values),
  isUsedJob: (id: number) => requests.onlyPost(`Account/IsUsedJob?jobId=${id}`),
  removeJobHistory: (id: number) =>
    requests.delete(`Account/RemoveJobHistory?jobHistoryId=${id}`),

  //--------------------------------------------project-----------------------------------------------//

  getProjectById: (id: number) =>
    requests.get(`Account/GetProjectById?branchId=${id}`),
  getProjectByIdAdmin: (id: number) =>
    requests.get(`Account/GetProjectByIdAdmin?branchId=${id}`),
  getProjectByUser: () => requests.get("Account/GetProjectByUser"),
  getProjectByUserId: (id: number) =>
    requests.get("Account/GetProjectByUserId?userId=" + id),
  searchProject: (branchId: number | null, search: string | null) =>
    requests.get(`Account/SearchProject?branchId=${branchId}${search}`),
  createUpdateProject: (values: any) =>
    requests.post("Account/CreateUpdateProject", values),
  uploadFile: (values: any) =>
    requests.post("Account/UploadFile", createFormData(values)),
  uploadImage: (values: any) =>
    requests.post("Account/uploadImage", createFormData(values)),
  removeConsultant: (id: number) =>
    requests.delete(`Account/RemoveConsultant?consultantId=${id}`),
  isUsedProject: (id: any) =>
    requests.onlyPost(`Account/IsUsedProject?projectId=${id}`),
  removeProject: (id: number) =>
    requests.delete(`Account/RemoveProject?projectId=${id}`),

  //--------------------------------------------roles-----------------------------------------------//

  getRoles: () => requests.get("Account/GetRoles"),
  CreateUpdateRole: (values: any) =>
    requests.post("Account/CreateUpdateRole", values),
  removeRole: (id: number) =>
    requests.delete(`Account/RemoveRole?roleId=${id}`),

  //--------------------------------------------prefixes-----------------------------------------------//

  getPrefixes: () => requests.get("Account/GetPrefixes"),
  createUpdatePrefix: (values: any) =>
    requests.post("Account/CreateUpdatePrefix", values),
  removePrefix: (id: number) =>
    requests.delete(`Account/RemovePrefix?prefixId=${id}`),

  //--------------------------------------------position-----------------------------------------------//

  getPositions: () => requests.get("Account/GetPositions"),
  createUpdatePosition: (values: any) =>
    requests.post("Account/createUpdatePosition", values),
  checkCountPosition: (id: number) =>
    requests.get("Account/CheckCountPosition?positionId=" + id),
  removePosition: (id: number) =>
    requests.delete(`Account/removePosition?positionId=${id}`),

  //--------------------------------------------generalPosition-----------------------------------------------//

  getGeneralPositions: () => requests.get("Account/GetGeneralPositions"),
  createUpdateGeneralPosition: (values: any) =>
    requests.post("Account/createUpdateGeneralPosition", values),
  removeGeneralPosition: (id: number) =>
    requests.delete(`Account/removeGeneralPosition?gpId=${id}`),
};
