import { makeAutoObservable, reaction } from "mobx";

export default class CommonStore {
  token: string | null = window.localStorage.getItem("jwt");
  system: string | null = window.localStorage.getItem("system");
  selectedKeys: string = window.localStorage.getItem("selectedKeys") || "0";
  tour: boolean = JSON.parse(
    window.localStorage.getItem("tour") || JSON.stringify(true)
  );

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

    reaction(
      () => this.selectedKeys,
      (selectedKeys) => {
        if (selectedKeys) {
          window.localStorage.setItem("selectedKeys", selectedKeys);
        } else this.removeSelectedKeys();
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

  setTour = (state: string) => {
    console.log("state", state);

    if (state) window.localStorage.setItem("tour", state);
    window.localStorage.setItem("tour", state);
    this.tour = JSON.parse(state);
  };

  setKeysToStorage = (key: string) => {
    let realKey: string = key;

    if (key === "12") {
      realKey = "8";
    } else if (key === "6" || key === "5") {
      realKey = "0";
    }

    if (realKey) window.localStorage.setItem("selectedKeys", realKey);
    this.selectedKeys = realKey;
  };

  setSelectedKeys = (state: string) =>
    state === "5" ? "0" : (this.selectedKeys = state);

  removeSelectedKeys = () => window.localStorage.removeItem("selectedKeys");

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
