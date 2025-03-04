import agent from "../api/agent";
import { loginDto } from "../models/DTO/interfaceDto";
import { makeAutoObservable, runInAction, reaction } from "mobx";
import { store } from "./store";
import { RoutePath } from "../constants/RoutePath";
import { HttpStatusCode } from "axios";
import { notify } from "../helper/components";
import { PersonnelinBranch } from "../models/PersonnelinBranch";
import { JobHistoryM } from "../models/JobHistory";
import { Project } from "../models/Projects";
import { Position } from "../models/Position";
import { Prefix } from "../models/Prefix";
import { generalPosition } from "../models/GeneralPosition";

export interface user {
  fullName: string;
  userName: string;
  image: string;
  userId: number;
  token: string;
  roleId: number;
  address: string;

  expert: string | null;
  lvEdu: string | null;
  description: string | null;
  prefixId: number | null;
  prefixName: string | null;
}

export interface propsDropdown {
  id: number[];
  key: string;
}

export default class UserStore {
  allAdmin = [];
  userString: string | null = window.localStorage.getItem("user");
  user: user | null =
    this.userString !== null ? JSON.parse(this.userString) : null;
  allPersonnel: any = [];
  Loading: boolean = false;
  prefix: Prefix[] = [];
  generalPosition: generalPosition[] = [];
  personnels: PersonnelinBranch[] = [];
  position: Position[] = [];
  students = [];
  project: any = [];
  projectAdmin: Project[] = [];
  projectUser: Project[] = [];
  roles: any = [];
  jobHistory: JobHistoryM[] = [];
  jobHistoryDropdown: propsDropdown[] = [];
  jobHistoryinBranch: JobHistoryM[] = [];
  loading: boolean = false;

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => this.user,
      (user) => {
        if (user) {
          window.localStorage.setItem("user", JSON.stringify(user));
        } else window.localStorage.removeItem("user");
      }
    );
  }

  get isLoggedIn() {
    return !!this.user;
  }

  setLoading = (state: boolean) => (this.loading = state);

  setUserToNull = (state: user | null) => (this.user = state);

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

  deCodeToken = async (token: string) => {
    try {
      return await agent.Acounts.getDeCodeToken(token);
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

  getAllPersonnel = async () => {
    try {
      var allUser = await agent.Acounts.getAllPersonnel();
      runInAction(() => {
        this.allPersonnel = allUser;
      });

      return allUser;
    } catch (error) {
      throw error;
    }
  };

  login = async (data: loginDto) => {
    this.setLoading(true);

    try {
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

      this.setLoading(false);
      return user;
    } catch (error) {
      this.setLoading(false);
      throw error;
    }
  };

  logout = (navigate: any) => {
    store.commonStore.setToken(null);
    this.user = null;
    navigate(RoutePath.home);
    store.commonStore.removeSelectedKeys();
    // Routers.navigate(RoutePath.home);
    // window.location.reload();
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

  //--------------------------------------------admin-----------------------------------------------//

  getAllAdminById = async (id: any) => {
    try {
      await agent.Acounts.getAllAdminById(id).then((e) => {
        runInAction(() => {
          this.allAdmin = e;
        });
      });
    } catch (error) {
      throw error;
    }
  };

  //--------------------------------------------personnel-----------------------------------------------//

  getPersonnelById = async (id: any) => {
    this.setLoading(true);
    try {
      await agent.Acounts.getPersonnelById(id).then((e) => {
        runInAction(() => {
          this.personnels = e;
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

  getPersonnelAdminById = async (id: any) => {
    this.setLoading(true);
    try {
      await agent.Acounts.GetPersonnelAdminById(id).then((e) => {
        runInAction(() => {
          this.personnels = e;
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

  updatePersonnel = async (values: any) => {
    try {
      await agent.Acounts.updatePersonnel(values);
    } catch (error) {
      throw error;
    }
  };

  updateMyAccountPersonnel = async (values: any) => {
    try {
      await agent.Acounts.updateMyAccountPersonnel(values);

      this.getPersonnelById(
        Number(store.BranchStore.currentBranchId) === 1
          ? 0
          : Number(store.BranchStore.currentBranchId)
      );
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

  removeUser = async (id: number) => {
    try {
      return await agent.Acounts.removeUser(id);
    } catch (error) {
      throw error;
    }
  };

  //--------------------------------------------student-----------------------------------------------//

  getStudentById = async (id: any) => {
    this.setLoading(true);
    try {
      await agent.Acounts.getStudentById(id).then((e) => {
        runInAction(() => {
          this.students = e;
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

  createStudent = async (values: any) => {
    try {
      return await agent.Acounts.createStudent(values);
    } catch (error) {
      throw error;
    }
  };

  updateStudent = async (values: any) => {
    try {
      await agent.Acounts.updateStudent(values);
    } catch (error) {
      throw error;
    }
  };

  updateMyAccountStudent = async (values: any) => {
    try {
      await agent.Acounts.updateMyAccountStudent(values);
      this.getStudentById(
        Number(store.BranchStore.currentBranchId) === 1
          ? 0
          : Number(store.BranchStore.currentBranchId)
      );
    } catch (error) {
      throw error;
    }
  };

  isUsedStudent = async (id: number) => {
    try {
      await agent.Acounts.isUsedStudent(id);
    } catch (error) {
      throw error;
    }
  };

  removeStudent = async (id: number) => {
    try {
      return await agent.Acounts.removeStudent(id);
    } catch (error) {
      throw error;
    }
  };

  //--------------------------------------------jobHistory-----------------------------------------------//

  getJobHistoryByBranch = async (id: number) => {
    try {
      return await agent.Acounts.getJobHistoryByBranch(id).then((e) => {
        runInAction(() => {
          this.jobHistoryinBranch = e;
          this.jobHistory = e;
        });

        return e;
      });
    } catch (error) {
      throw error;
    }
  };

  getJobHistoryDDByBranchByGroup = async (id: number) => {
    try {
      return await agent.Acounts.getJobHistoryDDByBranchByGroup(id).then(
        (e) => {
          runInAction(() => {
            this.jobHistoryDropdown = e;
          });

          return e;
        }
      );
    } catch (error) {
      throw error;
    }
  };

  getJobHistoriesByName = async (name: string) => {
    this.setLoading(true);

    try {
      return await agent.Acounts.getJobHistoriesByName(name).then((e) => {
        runInAction(() => {
          this.jobHistory = e;
        });

        this.setLoading(false);
        return e;
      });
    } catch (error) {
      runInAction(() => {
        this.setLoading(false);
      });
      throw error;
    }
  };

  getJobHistoryByBranchByGroupAll = async (id: number) => {
    this.setLoading(true);

    try {
      return await agent.Acounts.getJobHistoryByBranchByGroupAll(id).then(
        (e) => {
          runInAction(() => {
            this.jobHistory = e;
          });

          this.setLoading(false);
          return e;
        }
      );
    } catch (error) {
      runInAction(() => {
        this.setLoading(false);
      });
      throw error;
    }
  };

  getJobHistoryById = async () => {
    try {
      return await agent.Acounts.getJobHistoryById().then((e) => {
        runInAction(() => {
          this.jobHistory = e;
        });

        return e;
      });
    } catch (error) {
      throw error;
    }
  };

  getJobHistoryByUserId = async (id: number) => {
    try {
      return await agent.Acounts.getJobHistoryByUserId(id).then((e) => {
        runInAction(() => {
          this.jobHistory = e;
        });

        return e;
      });
    } catch (error) {
      throw error;
    }
  };

  createUpdateJobHistory = async (values: any) => {
    try {
      return await agent.Acounts.createUpdateJobHistory(values).then(() => {
        this.getJobHistoryById();
      });
    } catch (error) {
      throw error;
    }
  };

  isUsedJob = async (id: number) => {
    try {
      await agent.Acounts.isUsedJob(id).then(() => {
        this.getJobHistoryById();
      });
    } catch (error) {
      throw error;
    }
  };

  removeJobHistory = async (id: number) => {
    try {
      return await agent.Acounts.removeJobHistory(id).then(() => {
        this.getJobHistoryById();
      });
    } catch (error) {
      throw error;
    }
  };

  //--------------------------------------------user-----------------------------------------------//

  updateImageUser = async (values: any) => {
    try {
      await agent.Acounts.updateImageUser(values);
    } catch (error) {
      throw error;
    }
  };

  changePassword = async (values: any) => {
    try {
      return await agent.Acounts.changePassword(values);
    } catch (error) {
      throw error;
    }
  };

  //--------------------------------------------project-----------------------------------------------//

  getProjectById = async (id: number) => {
    try {
      return await agent.Acounts.getProjectById(id).then((e) => {
        runInAction(() => {
          this.project = e;
        });

        return e;
      });
    } catch (error) {
      throw error;
    }
  };

  getProjectByIdAdmin = async (id: number) => {
    try {
      return await agent.Acounts.getProjectByIdAdmin(id).then((e) => {
        runInAction(() => {
          this.projectAdmin = e;
        });

        return e;
      });
    } catch (error) {
      throw error;
    }
  };

  getProjectByUser = async () => {
    try {
      await agent.Acounts.getProjectByUser().then((e) => {
        runInAction(() => {
          this.projectUser = e;
        });
      });
    } catch (error) {
      throw error;
    }
  };

  getProjectByUserId = async (id: number) => {
    try {
      await agent.Acounts.getProjectByUserId(id).then((e) => {
        runInAction(() => {
          this.projectUser = e;
        });
      });
    } catch (error) {
      throw error;
    }
  };

  searchProject = async (branchId: number | null, search: string | null) => {
    this.setLoading(true);
    try {
      return await agent.Acounts.searchProject(branchId, search).then((res) => {
        runInAction(() => {
          this.project = res;
        });

        this.setLoading(false);
        return res;
      });
    } catch (error) {
      runInAction(() => {
        this.setLoading(false);
      });
      throw error;
    }
  };

  createUpdateProject = async (values: any) => {
    try {
      return await agent.Acounts.createUpdateProject(values);
    } catch (error) {
      throw error;
    }
  };

  uploadFile = async (values: any) => {
    try {
      return await agent.Acounts.uploadFile(values);
    } catch (error) {
      throw error;
    }
  };

  uploadImage = async (values: any) => {
    try {
      return await agent.Acounts.uploadImage(values);
    } catch (error) {
      throw error;
    }
  };

  removeConsultant = async (id: number) => {
    try {
      return await agent.Acounts.removeConsultant(id);
    } catch (error) {
      throw error;
    }
  };

  isUsedProject = async (id: any) => {
    try {
      return await agent.Acounts.isUsedProject(id).then(() => {
        this.getProjectById(Number(store.BranchStore.currentBranchId));
        this.getProjectByIdAdmin(Number(store.BranchStore.currentBranch));
      });
    } catch (error) {
      throw error;
    }
  };

  removeProject = async (id: number) => {
    try {
      return await agent.Acounts.removeProject(id);
    } catch (error) {
      throw error;
    }
  };

  //--------------------------------------------roles-----------------------------------------------//

  getRoles = async () => {
    try {
      await agent.Acounts.getRoles().then((e) => {
        runInAction(() => {
          this.roles = e;
        });
      });
    } catch (error) {
      throw error;
    }
  };

  CreateUpdateRole = async (values: any) => {
    try {
      return await agent.Acounts.CreateUpdateRole(values);
    } catch (error) {
      throw error;
    }
  };

  removeRole = async (id: number) => {
    try {
      return await agent.Acounts.removeRole(id);
    } catch (error) {
      throw error;
    }
  };

  //--------------------------------------------prefixes-----------------------------------------------//

  getPrefixes = async () => {
    try {
      await agent.Acounts.getPrefixes().then((e) => {
        runInAction(() => {
          this.prefix = e;
        });
      });
    } catch (error) {
      throw error;
    }
  };

  createUpdatePrefix = async (values: any) => {
    try {
      return await agent.Acounts.createUpdatePrefix(values);
    } catch (error) {
      throw error;
    }
  };

  removePrefix = async (id: number) => {
    try {
      return await agent.Acounts.removePrefix(id);
    } catch (error) {
      throw error;
    }
  };

  //--------------------------------------------position-----------------------------------------------//

  getPositions = async () => {
    try {
      await agent.Acounts.getPositions().then((e) => {
        runInAction(() => {
          this.position = e;
        });
      });
    } catch (error) {
      throw error;
    }
  };

  createUpdatePosition = async (values: any) => {
    try {
      return await agent.Acounts.createUpdatePosition(values);
    } catch (error) {
      throw error;
    }
  };

  checkCountPosition = async (id: number) => {
    try {
      return await agent.Acounts.checkCountPosition(id);
    } catch (error) {
      throw error;
    }
  };

  removePosition = async (id: number) => {
    try {
      return await agent.Acounts.removePosition(id).then(() => {
        this.getPositions();
      });
    } catch (error) {
      throw error;
    }
  };

  //--------------------------------------------generalPosition-----------------------------------------------//

  getGeneralPositions = async () => {
    try {
      await agent.Acounts.getGeneralPositions().then((e) => {
        runInAction(() => {
          this.generalPosition = e;
        });
      });
    } catch (error) {
      throw error;
    }
  };

  createUpdateGeneralPosition = async (values: any) => {
    try {
      return await agent.Acounts.createUpdateGeneralPosition(values);
    } catch (error) {
      throw error;
    }
  };

  removeGeneralPosition = async (id: number) => {
    try {
      return await agent.Acounts.removeGeneralPosition(id);
    } catch (error) {
      throw error;
    }
  };
}
