import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { OrderSlips } from "../models/OrderSlips"; 

export class OrderSlipStore {
  orderSlips: OrderSlips[] = [];
  orderSlipsByBranch = [];
  orderSlipItem = [];

  constructor() {
    makeAutoObservable(this);
  }

  getOrderSlipList = async () => {
    try {
      await agent.OrderSlips.getOrderSlips().then((e) => {
        runInAction(() => {
          this.orderSlips = e;
        });
      });
    } catch (error) {
      console.error("Error fetching orderSlip :", error);
    }
  };

  getOrderSlipsByBranch = async (id: number) => {
    try {
      await agent.OrderSlips.getOrderSlipsByBranch(id).then((e) => {
        runInAction(() => {
          this.orderSlipsByBranch = e;
        });
      });
    } catch (error) {
      console.error("Error fetching orderSlipByBranch :", error);
    }
  };

  createOrderSlip = async (values: any) => {
    try {
      var result = await agent.OrderSlips.createOrderSlip(values);
      console.log("OrderSlip : ", result);

      return result;
      // Routers.navigate(RoutePath.orderslips);
    } catch (error) {
      console.error("Error create orderSlip :", error);
    }
  };

  createOrderSlipItem = async (values: any) => {
    try {
      var result = await agent.OrderSlips.createOrderSlipItem(values).then(
        (res) => {
          console.log("res : ", res); 
          // if (res?.statusCode === axios.HttpStatusCode.Ok) {
          //   Routers.navigate(RoutePath.orderslips);
          // } else {
          //   notifyFailed();
          // }
        }
      );
      console.log("SlipItem : ", result);

      return result;
    } catch (error) {
      console.error("Error create orderSlipItem :", error);
    }
  };

  confirmOrderSlip = async (orderSlipId: any) => {
    try {
      await agent.OrderSlips.confirmOrderSlip(orderSlipId).then((e) => {
        console.log("confirmOrderSlip success : ", e);
      });
    } catch (error) {
      console.error("Error confirm orderSlip :", error);
    }
  };

  removeOrderSlipItem = async (id: any) => {
    try {
      await agent.OrderSlips.removeOrderSlipItem(id);
    } catch (error) {
      console.error("Error remove orderSlip :", error);
    }
  };

  removeOrderSlip = async (id: any) => {
    try {
      await agent.OrderSlips.removeOrderSlip(id);
    } catch (error) {
      console.error("Error remove orderSlip :", error);
    }
  };

  ChangeQuantity = async (values: any) => {
    try {
      await agent.OrderSlips.changeQuantity(values);
    } catch (error) {
      console.error("Error ChangeQuantity :", error);
    }
  };

  getItemById = async (paymentId: number) => {
    try {
      await agent.OrderSlips.getItemById(paymentId).then((e) => {
        runInAction(() => {
          this.orderSlipItem = e;
        }); 
      });
    } catch (error) {
      console.error("Error getItemById :", error);
    }
  };

}
