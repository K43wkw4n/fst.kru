import agent from "../api/agent";
import { loginDto } from "../models/DTO/interfaceDto";
import { makeAutoObservable, runInAction } from "mobx";
import { store } from "./store";
import { RoutePath } from "../constants/RoutePath";
import { Routers } from "../App";
import { HttpStatusCode } from "axios";
import { notify } from "../helper/components";

export default class UserStore {
  user: loginDto | undefined = undefined;
  Loading: boolean = false;
  prefix = [];
  generalPosition = [];
  personnels = [];
  position = [];

  constructor() {
    makeAutoObservable(this);
  }

  get isLoggedIn() {
    return !!this.user;
  }

  getPrefixAndPosition = async () => {
    try {
      var data = await agent.Acounts.getPrefixAndPosition();
      runInAction(() => {
        this.prefix = data.prefix;
        this.generalPosition = data.generalPosition;
        this.position = data.position;
      });
    } catch (error) {
      throw error;
    }
  };

  getCurrentUser = async () => {
    try {
      var user = await agent.Acounts.getCurrentUser();
      store.commonStore.setToken(user.token);

      runInAction(() => {
        this.user = { ...user };
      });
    } catch (error) {
      throw error;
    }
  };

  login = async (data: loginDto) => {
    this.Loading = true;

    var user = await agent.Acounts.login(data);
    console.log("user", user);

    if (
      user.statusCode === HttpStatusCode.NotFound ||
      user.statusCode === HttpStatusCode.BadRequest
    ) {
      notify("กรุณาใส่ข้อมูลให้ถูกต้อง");
    } else {
      store.commonStore.setToken(user.token);
      runInAction(() => (this.user = { ...user }));
      store.modalStore.closeModal();
      console.log("user", user);
    }

    return user;
  };

  logout = () => {
    store.commonStore.setToken(null);
    this.user = undefined;
    Routers.navigate(RoutePath.home);
  };

  register = async (values: any) => {
    try {
      return await agent.Acounts.register(values);
      // await agent.Acounts.register(values).then(() => {
      //   this.login({ userName: values.userName, password: values.password });
      // });
    } catch (error) {
      throw error;
    }
  };

  getPersonnelById = async (id: any) => {
    try {
      await agent.Acounts.getPersonnelById(id).then((e) => {
        runInAction(() => {
          this.personnels = e;
        });
      });
    } catch (error) {
      throw error;
    }
  };

  isUsedUser = async (id: number) => { 
    try {
      await agent.Acounts.isUsedUser(id);
    } catch (error) {
      throw error;
    }
  };

  updatePersonnel = async (values: any) => {
    try {
      await agent.Acounts.updatePersonnel(values)
    } catch (error) {
      throw error;
    }
  };
}
