import { Routers } from "../App";
import agent from "../api/agent";
import { RoutePath } from "../constants/RoutePath";
import { PaymentVoucher } from "../models/PaymentVoucher";
import { makeAutoObservable } from "mobx";
import { runInAction } from "mobx";
import { store } from "./store";

export class PaymentVoucherStore {
  paymentVouchers: PaymentVoucher[] = [];
  paymentVouchersByBranch = [];
  paymentItem = [];

  constructor() {
    makeAutoObservable(this);
  }

  getPaymentVoucher = async () => {
    try {
      await agent.PaymentVouchers.getPaymentVouchers().then((e) => {
        runInAction(() => {
          this.paymentVouchers = e;
        });
      });
    } catch (error) {
      console.error("Error fetching PaymentVoucher :", error);
    }
  };

  getPaymentVouchersByBranch = async (id: number) => {
    try {
      await agent.PaymentVouchers.getPaymentVouchersByBranch(id).then((e) => {
        runInAction(() => {
          this.paymentVouchersByBranch = e;
        });
      });
    } catch (error) {
      console.error("Error fetching orderSlipByBranch :", error);
    }
  };

  createPaymentVoucher = async (values: any) => {
    try {
      var result = await agent.PaymentVouchers.createPaymentVoucher(values);
      console.log("PaymentVoucherId : ", result);

      return result;
    } catch (error) {
      console.error("Error create PaymentVoucher :", error);
    }
  };

  createPaymentVoucherItem = async (values: any) => {
    console.log("valuesCreate : ", values);

    try {
      await agent.PaymentVouchers.createPaymentVoucherItem(values);
    } catch (error) {
      console.error("Error create PaymentVoucherItem :", error);
    }
  };

  noteInPaymentVoucherItem = async (values: any) => {
    try {
      await agent.PaymentVouchers.noteInPaymentVoucherItem(values).then(() => {
        this.getPaymentVoucher();
        console.log("successfully note");
      });
    } catch (error) {
      console.error("Error create noteInPaymentVoucherItem :", error);
    }
  };

  removePaymentVoucher = async (id: number) => {
    try {
      await agent.PaymentVouchers.removePaymentVoucher(id).then(() => { 
        console.log("successfully removed");
      });
    } catch (error) {
      console.error("Error remove PaymentVoucher :", error);
    }
  };

  removePaymentVoucherItem = async (id: number) => {
    try {
      await agent.PaymentVouchers.removePaymentVoucherItem(id).then(() => { 
        console.log("successfully removed item");
      });
    } catch (error) {
      console.error("Error remove PaymentVoucherItem :", error);
    }
  };

  confirmPaymentVoucher = async (values: any) => {
    try {
      agent.PaymentVouchers.confirmPaymentVoucher(values).then((e) => {
        console.log("confirmPaymentVoucher success : ", e);
        this.getPaymentVouchersByBranch(Number(store.BranchStore.currentBranchId));
      });
    } catch (error) {
      console.error("Error confirmPaymentVoucher :", error);
    }
  }

  ChangeQuantity = async (values: any) => {
    try {
      await agent.PaymentVouchers.changeQuantity(values);
    } catch (error) {
      console.error("Error ChangeQuantity :", error);
    }
  };

  getItemById = async (paymentId: number) => {
    try {
      await agent.PaymentVouchers.getItemById(paymentId).then((e) => {
        runInAction(() => {
          this.paymentItem = e;
        }); 
      });
    } catch (error) {
      console.error("Error getItemById :", error);
    }
  };

  setItem = () => {
    this.paymentItem = [];
  }
 
}
