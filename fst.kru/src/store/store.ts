import { createContext, useContext } from "react";
import commonStore from "./common.store";
import { ParcelStore } from "./parcel.store";
import { OrderSlipStore } from "./orderSlip.store";
import UserStore from "./user.store";
import { ModalStore } from "./modal.store";
import { BudgetStore } from "./budget.store";
import { PaymentVoucherStore } from "./paymentVoucher.store";
import { BranchStore } from "./branch.store";
import { ResearchAndProjectStore } from "./ResearchAndProject.store";
import { CourseSpecificationStore } from "./CourseSpecificationStore";
import { AnnualDirectorStore } from "./annualDirector.store";
import { DashboardStore } from "./dashboardStore.store";

interface Store {
  commonStore: commonStore;
  parcelStore: ParcelStore;
  orderSlipStore: OrderSlipStore;
  userStore: UserStore;
  modalStore: ModalStore;
  budgetStore: BudgetStore;
  paymentVoucherStore: PaymentVoucherStore;
  BranchStore: BranchStore;
  ResearchAndProjectStore: ResearchAndProjectStore;
  courseSpecificationStore: CourseSpecificationStore;
  annualDirectorStore: AnnualDirectorStore;
  dashBoardStore: DashboardStore;
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
  ResearchAndProjectStore: new ResearchAndProjectStore(),
  courseSpecificationStore: new CourseSpecificationStore(),
  annualDirectorStore: new AnnualDirectorStore(),
  dashBoardStore: new DashboardStore(),
};

export const StoreContext = createContext(store);

export const useStore = () => {
  return useContext(StoreContext);
};
