import { makeAutoObservable, runInAction } from "mobx";
import { Parcels } from "../models/Supplies";
import agent from "../api/agent";
import { RoutePath } from "../constants/RoutePath";

export class ParcelStore {
  parcel: Parcels[] = [];
  parcelOfBranch: [] = [];

  constructor() {
    makeAutoObservable(this);
  }

  getParcelList = async () => {
    try {
      await agent.Parcels.getParcel().then((e) => {
        runInAction(() => {
          this.parcel = e;
        });
      });
    } catch (error) {
      console.error("Error fetching supplies:", error);
    }
  };

  getParcelOfBranch = async (id: number) => {
    try {
      await agent.Parcels.getParcelOfBranch(id).then((e) => {
        runInAction(() => {
          this.parcelOfBranch = e;
        });
      });
    } catch (error) {
      console.error("Error fetching suppliesinstock:", error);
    }
  };

  checkAlreadyParcel = async (data: Parcels) => {
    try {
      return await agent.Parcels.checkAlreadyParcel(data);
    } catch (error) {
      console.error("Error create supplies:", error);
    }
  };

  createUpdateParcel = async (data: Parcels, navigate: any) => {
    try {
      await agent.Parcels.createParcel(data).then(() => {
        this.getParcelList();

        navigate(RoutePath.parcel);
        // Routers.navigate(RoutePath.parcel);
      });
    } catch (error) {
      console.error("Error create supplies:", error);
    }
  };

  removeParcel = async (parcelId: number) => {
    try {
      await agent.Parcels.removeParcel(parcelId).then(() => {
        this.getParcelList();
      });
    } catch (error) {
      console.error("Error remove supplies:", error);
    }
  };
}
