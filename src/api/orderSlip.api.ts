import { Budgets } from "../models/Budgets";
import { requests } from "./agent";

export const OrderSlips = {
  getOrderSlips: () => requests.get("OrderSlip/GetOrderSlips"),
  getOrderSlipsByBranch: (id: number) =>
    requests.get(`OrderSlip/GetOrderSlipByBranch?branchId=${id}`),
  getItemById: (orderId: number) =>
    requests.get(`OrderSlip/GetItemById?OrderId=${orderId}`),
  createOrderSlip: (values: any) =>
    requests.post("OrderSlip/CreateOrderSlip", values),
  removeOrderSlip: (id: number) =>
    requests.delete(`OrderSlip/RemoveOrderSlip?orderSlipId=${id}`),
  createOrderSlipItem: (values: any) =>
    requests.post("OrderSlip/CreateOrderSlipItem", values),
  removeOrderSlipItem: (id: number) =>
    requests.delete(`OrderSlip/RemoveOrderSlipItem?OrderSlipItemId=${id}`),

  confirmOrderSlip: (values: any) =>
    requests.post(`OrderSlip/ConfirmOrderSlip`, values),

  changeQuantity: (values: any) =>
    requests.post("OrderSlip/ChangeQuantity", values),

  getBudgets: () => requests.get("OrderSlip/GetBudgets"),
  createBudget: (values: Budgets) =>
    requests.post("OrderSlip/CreateUpdateBudget", values),
  removeBudget: (id: number) =>
    requests.delete(`OrderSlip/RemoveBudget?budgetId=${id}`),
};
