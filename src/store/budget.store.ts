import agent from "../api/agent";
import { Budgets } from "../models/Budgets";
import { makeAutoObservable } from "mobx";
import { runInAction } from "mobx";

export class BudgetStore {
  budgets: Budgets[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  getBudgetList = async () => {
    try {
      await agent.OrderSlips.getBudgets().then((e) =>
        runInAction(() => {
          this.budgets = e;
        })
      );
    } catch (error) {
      console.error("Error fetching budgets:", error);
    }
  };

  createBudget = async (values: string) => {
    const createData: Budgets = {
      id: 0,
      budgetName: values,
    };

    try {
      await agent.OrderSlips.createBudget(createData).then(() =>
        runInAction(() => {
          this.getBudgetList();
        })
      );
    } catch (error) {
      console.error("Error create budget:", error);
    }
  };

  removeBudget = async (id: number) => {
    try {
      await agent.OrderSlips.removeBudget(id).then(() =>
        runInAction(() => {
          this.getBudgetList(); 
        })
      );
    } catch (error) {
      // console.error("Error remove budget:", error);
      alert("ไม่สามารลบได้ เนื่องจากงบประมาณนี้มีการใช้งานอยู่")
    }
  };
}
