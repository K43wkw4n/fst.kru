import { requests } from "./agent";

export const PaymentVouchers = {
  getPaymentVouchers: () => requests.get("PaymentVoucher/GetPaymentVoucher"),
  getPaymentVouchersByBranch: (id: number) =>
    requests.get(`PaymentVoucher/GetPaymentVoucherByBranch?branchId=${id}`),
  getItemById: (paymentId: number) =>
    requests.get(`PaymentVoucher/GetItemById?paymentId=${paymentId}`),

  createPaymentVoucher: (values: any) =>
    requests.post("PaymentVoucher/CreatePaymentVoucher", values),
  createPaymentVoucherItem: (values: any) => {
    console.log("values createItem :L ", values);
    return requests.post("PaymentVoucher/CreatePaymentVoucherItem", values);
  },

  confirmPaymentVoucher: (paymentId: number) =>
    requests.onlyPost(
      `PaymentVoucher/ConfirmPaymentVoucher?paymentVoucherId=${paymentId}`
    ),

  changeQuantity: (values: any) =>
    requests.post("PaymentVoucher/ChangeQuantity", values),

  noteInPaymentVoucherItem: (values: any) =>
    requests.post("PaymentVoucher/NoteInPaymentVoucherItem", values),

  removePaymentVoucher: (id: any) =>
    requests.delete(`PaymentVoucher/RemovePayment?paymentVId=${id}`),
  removePaymentVoucherItem: (id: any) =>
    requests.delete(`PaymentVoucher/RemovePaymentItem?paymentVItemId=${id}`),
};
