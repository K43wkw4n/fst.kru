import { loginDto } from "../models/DTO/interfaceDto";
import { createFormData, requests } from "./agent";

export const Acounts = {
  getPrefixAndPosition: () => requests.get("Account/GetPrefixAndPosition"),
  getCurrentUser: () => requests.get("Account/GetCurrentUser"),
  login: (values: loginDto) => requests.post("Account/Login", values),
  register: (values: any) =>
    requests.post("Account/Register", createFormData(values)),
  getPersonnelById: (id: number) =>
    requests.get(`Account/GetPersonnelById?branchId=${id}`),
  isUsedUser: (id: number) =>
    requests.onlyPost(`Account/IsUsedUser?userId=${id}`),
  updatePersonnel: (values: any) =>
    requests.post("Account/UpdatePersonnel", createFormData(values)),
};
