import agent from "../api/agent";
import { runInAction, makeAutoObservable } from "mobx";
import { Category } from "../models/Category";
import { RAP } from "../models/RAP";
import { propsDropdown } from "./user.store";

export class ResearchAndProjectStore {
  RAPUser: RAP[] = [];
  RAPUserAdmin: RAP[] = [];
  categories: Category[] = [];
  categoryNameDropdown: propsDropdown[] = [];
  loading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setLoading = (state: boolean) => (this.loading = state);

  getResearchAndProjectById = async (id: any) => {
    try {
      return await agent.ResearchAndProject.getResearchAndProjectById(id).then(
        (res) => {
          runInAction(() => {
            this.RAPUser = res;
          });

          return res;
        }
      );
    } catch (error) {
      throw error;
    }
  };

  getResearchAndProjectByIdAdmin = async (id: any) => {
    try {
      return await agent.ResearchAndProject.getResearchAndProjectByIdAdmin(
        id
      ).then((res) => {
        runInAction(() => {
          this.RAPUserAdmin = res;
        });

        return res;
      });
    } catch (error) {
      throw error;
    }
  };

  getResearchAndProjectByUser = async () => {
    try {
      await agent.ResearchAndProject.getResearchAndProjectByUser().then(
        (res) => {
          runInAction(() => {
            this.RAPUser = res;
          });
        }
      );
    } catch (error) {
      throw error;
    }
  };

  getResearchAndProjectByUserId = async (id: number) => {
    try {
      await agent.ResearchAndProject.getResearchAndProjectByUserId(id).then(
        (res) => {
          runInAction(() => {
            this.RAPUser = res;
          });
        }
      );
    } catch (error) {
      throw error;
    }
  };

  searchResearchAndProject = async (
    branchId: number | null,
    category: string | null,
    search: string | null
  ) => {
    this.setLoading(true);
    try {
      return await agent.ResearchAndProject.searchResearchAndProject(
        branchId,
        category,
        search
      ).then((res) => {
        runInAction(() => {
          this.RAPUser = res;
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

  createUpdateRAP = async (values: any) => {
    try {
      await agent.ResearchAndProject.createUpdateRAP(values).then(() => {
        runInAction(() => {
          this.getResearchAndProjectByUser();
        });
      });
    } catch (error) {
      throw error;
    }
  };

  removeRAP = async (id: any) => {
    try {
      return await agent.ResearchAndProject.removeRAP(id);
    } catch (error) {
      throw error;
    }
  };

  isUsedResearch = async (id: any) => {
    console.log("id ", id);

    try {
      return await agent.ResearchAndProject.isUsedResearch(id);
    } catch (error) {
      throw error;
    }
  };

  uploadFile = async (values: any) => {
    try {
      return await agent.ResearchAndProject.uploadFile(values);
    } catch (error) {
      throw error;
    }
  };

  uploadImage = async (values: any) => {
    try {
      return await agent.ResearchAndProject.uploadImage(values);
    } catch (error) {
      throw error;
    }
  };

  //--------------------------------------------category-----------------------------------------------//

  getCategory = async () => {
    try {
      await agent.ResearchAndProject.getCategory().then((res) => {
        runInAction(() => {
          this.categories = res;
        });
      });
    } catch (error) {
      throw error;
    }
  };

  getCategoryNameDDByBranchByGroup = async (id: number | null) => {
    try {
      return await agent.ResearchAndProject.getCategoryNameDDByBranchByGroup(
        id
      ).then((e) => {
        runInAction(() => {
          this.categoryNameDropdown = e;
        });

        return e;
      });
    } catch (error) {
      throw error;
    }
  };

  ctreateUpdateCategory = async (name: any) => {
    const createData: Category = {
      id: 0,
      name: name,
    };

    try {
      await agent.ResearchAndProject.ctreateUpdateCategory(createData).then(
        () => {
          runInAction(() => {
            this.getCategory();
          });
        }
      );
    } catch (error) {
      throw error;
    }
  };

  removeCategory = async (id: number) => {
    try {
      await agent.ResearchAndProject.removeCategory(id).then(() => {
        runInAction(() => {
          this.getCategory();
        });
      });
    } catch (error) {
      throw error;
    }
  };
}
