import { createContext, useContext } from "react";
import commonStore from "./common.store";
import { ParcelStore } from "./parcel.store";
import { OrderSlipStore } from "./orderSlip.store";
import UserStore from "./user.store";
import { ModalStore } from "./modal.store";
import { BudgetStore } from "./budget.store";
import { PaymentVoucherStore } from "./paymentVoucher.store";
import { BranchStore } from './branch.store';

interface Store {
  commonStore: commonStore;
  parcelStore: ParcelStore;
  orderSlipStore: OrderSlipStore;
  userStore: UserStore;
  modalStore: ModalStore;
  budgetStore: BudgetStore;
  paymentVoucherStore: PaymentVoucherStore;
  BranchStore: BranchStore;
}

export const store: Store = {
  commonStore: new commonStore(),
  parcelStore: new ParcelStore(),
  orderSlipStore: new OrderSlipStore(),
  userStore: new UserStore(),
  modalStore: new ModalStore(),
  budgetStore: new BudgetStore(),
  paymentVoucherStore: new PaymentVoucherStore(),
  BranchStore: new BranchStore(),
};

export const StoreContext = createContext(store);

export const useStore = () => {
  return useContext(StoreContext);
};
