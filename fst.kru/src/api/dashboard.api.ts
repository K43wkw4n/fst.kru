import { requests } from "./agent";

export const Dashboards = {
  getUserById: (id: number) =>
    requests.get(`Dashboard/GetUserById?branchId=${id}`),
  getUserByPositionById: (id: number) =>
    requests.get(`Dashboard/GetUserByPositionById?branchId=${id}`),
  getUserByLvEduById: (id: number) =>
    requests.get(`Dashboard/GetUserByLvEduById?branchId=${id}`),
};
