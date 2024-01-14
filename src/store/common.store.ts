import { makeAutoObservable, reaction } from "mobx";
import { ModalStore } from "./modal.store";

export default class CommonStore {
  token: string | null = window.localStorage.getItem("jwt");
  system: string | null = window.localStorage.getItem("system");

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => this.token,
      (token) => {
        if (token) {
          window.localStorage.setItem("jwt", token);
        } else window.localStorage.removeItem("jwt");
      }
    );

    reaction(
      () => this.system,
      (system) => {
        if (system) {
          window.localStorage.setItem("system", system);
        } else window.localStorage.removeItem("system");
      }
    );

    // when(
    //   () => this.token !== undefined && this.system !== undefined,
    //   () => {
    //     window.localStorage.setItem("jwt", this.token!);
    //     window.localStorage.setItem("system", this.system!);
    //   }
    // );
  }
    
  setToken = (token: string | null) => {
    if (token) window.localStorage.setItem("jwt", token);
    this.token = token;
  };

  setSystem = () => {
      this.system = "suppliesMode";
  };

  removeSystem = () => {
    this.system = null;
  };
}
