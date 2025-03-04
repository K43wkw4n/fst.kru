import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Position } from "../models/Position";
import { personnel } from "../models/Personnel";
import { generalPosition } from "../models/GeneralPosition";
import { Student } from "../models/Student";

interface userByPositionProp {
  position: Position;
  users: number;
}

interface userProp {
  users: {
    position: generalPosition;
    users: number;
  }[];
  students: {
    student: number;
  }[];
}

interface userByLvEdu {
  lvEdu: string;
  users: number;
}

export class DashboardStore {
  loading: boolean = false;
  user: userProp | null = null;
  userByPosition: userByPositionProp[] = [];
  userByLvEdu: userByLvEdu[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setLoading = (state: boolean) => (this.loading = state);

  getUserById = async (id: number) => {
    this.setLoading(true);
    try {
      await agent.Dashboards.getUserById(id).then((e) => {
        runInAction(() => {
          this.user = e;
        });
      });
      this.setLoading(false);
    } catch (error) {
      runInAction(() => {
        this.setLoading(false);
      });
      throw error;
    }
  };

  getUserByPositionById = async (id: number) => {
    this.setLoading(true);
    try {
      await agent.Dashboards.getUserByPositionById(id).then((e) => {
        runInAction(() => {
          this.userByPosition = e;
        });
      });
      this.setLoading(false);
    } catch (error) {
      runInAction(() => {
        this.setLoading(false);
      });
      throw error;
    }
  };

  getUserByLvEduById = async (id: number) => {
    this.setLoading(true);
    try {
      await agent.Dashboards.getUserByLvEduById(id).then((e) => {
        runInAction(() => {
          this.userByLvEdu = e;
        });
      });
      this.setLoading(false);
    } catch (error) {
      runInAction(() => {
        this.setLoading(false);
      });
      throw error;
    }
  };
}
