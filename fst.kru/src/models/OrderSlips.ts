import { Budgets } from "./Budgets";
import { personnel } from "./Personnel";

export interface OrderSlips {
  id: number;
  orderSlipImportantId: string;
  orderSlipNumber: string;
  petitionNumber: string;
  orderSlipStatus: number;
  year: string;
  storageLocation: string;
  createdAt: Date;
  personnel: personnel;
  budget: Budgets
}

