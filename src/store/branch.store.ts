import { makeAutoObservable, reaction, runInAction } from "mobx";
import agent from "../api/agent";
import { Curriculums } from "../models/Curriculum";

export const dataMock = {
  id: 0,
  branchName: "กำลังรอ...",
  logo: "https://www.kru.ac.th/kru/assets/img/kru/logo/kru_color.png",
  pageFacebook: "",
  branchId: 0,
};

export class BranchStore {
  branch: [] = []; //dropdown ทุกตัว
  currentBranch: any = dataMock; //ตัวเดียว
  currentBranchId: string | null = window.localStorage.getItem("currentBranch"); //get async
  // systemSettings: any = dataMock;
  slideShow = [];
  welearn = [];
  news = [];
  curriculum: any = [];

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => this.currentBranchId,
      (currentBranchId) => {
        if (currentBranchId) {
          window.localStorage.setItem("currentBranch", currentBranchId);
        } else window.localStorage.removeItem("currentBranch");
      }
    );
  }

  setCurrentBranch = (id: number) => {
    if (id) window.localStorage.setItem("currentBranch", id.toString());
    this.currentBranchId = id.toString();
    this.getBranchById(Number(this.currentBranchId));
  };

  getCurrentBranch = () => {
    const currentId = window.localStorage.getItem("currentBranch"); //get async
    this.currentBranchId = currentId;
    // this.currentBranchId !== null &&
    //   this.GetSystemSettingByBranch(Number(currentId));
  };

  getBranchs = async () => {
    try {
      await agent.Branchs.getBranch().then((e) => {
        runInAction(() => {
          this.branch = e; //dropdown
        });
      });
    } catch (error) {
      throw error;
    }
  };

  getBranchById = async (id: number) => {
    try {
      await agent.Branchs.getBranchById(id).then((e) => {
        runInAction(() => {
          this.currentBranch = e.branch; //ตัวเดียว
          this.slideShow = e.slideShow;
        });
      });
    } catch (error) {
      throw error;
    }
  };

  createUpdateBranch = async (values: any) => {
    try {
      return await agent.Branchs.createUpdateBranch(values);
    } catch (error) {
      throw error;
    }
  };

  removeBranch = async (id: number) => {
    try {
      await agent.Branchs.removeBranch(id).then(() => {
        runInAction(() => {
          this.getBranchs();
          this.currentBranch();
          this.getBranchById(Number(this.currentBranchId));
        });
      });
    } catch (error) {
      throw error;
    }
  };

  //--------------------------------------------------systemSettings----------------------------------------------

  // GetSystemSettingByBranch = async (id: number) => {
  //   try {
  //     await agent.Branchs.getSystemSettingByBranch(id).then((e: any) => {
  //       // console.log("e.statusCode ", e.statusCode);

  //       runInAction(() => {
  //         this.systemSettings =
  //           e.statusCode !== HttpStatusCode.NotFound ? e : dataMock;
  //       });
  //     });
  //   } catch (error) {
  //     throw error;
  //   }
  // };

  // createUpdateSystemSettings = async (values: any) => {
  //   try {
  //     return await agent.Branchs.createUpdateSystemSettings(values);
  //   } catch (error) {
  //     throw error;
  //   }
  // };

  //--------------------------------------------------slideShow----------------------------------------------

  GetSlideShowById = async (id: number) => {
    try {
      await agent.Branchs.getSlideShowById(id).then((e: any) => {
        runInAction(() => {
          this.slideShow = e;
        });
      });
    } catch (error) {
      throw error;
    }
  };

  createUpdateSlideShow = async (values: any) => {
    try {
      return await agent.Branchs.createUpdateSlideShow(values);
    } catch (error) {
      throw error;
    }
  };

  removeSlideShow = async (id: number) => {
    try {
      await agent.Branchs.removeSlideShow(id);
    } catch (error) {
      throw error;
    }
  };

  //--------------------------------------------------WElearn----------------------------------------------

  getWeLearnById = async (id: number) => {
    try {
      await agent.Branchs.getWeLearnById(id).then((e: any) => {
        runInAction(() => {
          this.welearn = e;
        });
      });
    } catch (error) {
      throw error;
    }
  };

  createUpdateWeLearn = async (values: any) => {
    try {
      return await agent.Branchs.createUpdateWeLearn(values);
    } catch (error) {
      throw error;
    }
  };

  isUsedWeLearn = async (id: number) => {
    try {
      await agent.Branchs.isUsedWeLearn(id);
    } catch (error) {
      throw error;
    }
  };

  removeWeLearn = async (id: number) => {
    try {
      await agent.Branchs.removeWeLearn(id);
    } catch (error) {
      throw error;
    }
  };

  //--------------------------------------------------news----------------------------------------------

  getNewsById = async (id: number) => {
    try {
      await agent.Branchs.getNewsById(id).then((e: any) => {
        runInAction(() => {
          this.news = e;
        });
      });
    } catch (error) {
      throw error;
    }
  };

  createUpdateNews = async (values: any, formfiles: any) => {
    try {
      return await agent.Branchs.createUpdateNews(values, formfiles);
    } catch (error) {
      throw error;
    }
  };

  removeNews = async (id: number) => {
    try {
      return await agent.Branchs.removeNews(id).then(() => {
        runInAction(() => {
          this.getNewsById(Number(this.currentBranchId));
        });
      });
    } catch (error) {
      throw error;
    }
  };

  removeNewsPhoto = async (id: number) => {
    try {
      return await agent.Branchs.removeNewsPhoto(id).then(() => {
        runInAction(() => {
          this.getNewsById(Number(this.currentBranchId));
        });
      });
    } catch (error) {
      throw error;
    }
  };

  isUsedNews = async (id: number) => {
    try {
      await agent.Branchs.isUsedNews(id);
    } catch (error) {
      throw error;
    }
  };

  //--------------------------------------------------curriculum----------------------------------------------

  getCurriculumById = async (id: number) => {
    try {
      await agent.Branchs.getCurriculumById(id).then((e: any) => {
        runInAction(() => {
          this.curriculum = e;
        });
      });
    } catch (error) {
      throw error;
    }
  };

  createUpdateCurriculum = async (values: any) => {
    try {
      return await agent.Branchs.createUpdateCurriculum(values);
    } catch (error) {
      throw error;
    }
  };

  uploadFile = async (values: any) => {
    try {
      return await agent.Branchs.uploadFile(values);
    } catch (error) {
      throw error;
    }
  };

  removeCurriculum = async (id: number) => {
    try {
      return await agent.Branchs.removeCurriculum(id).then(() => {
        runInAction(() => {
          this.getCurriculumById(Number(this.currentBranchId));
        });
      });
    } catch (error) {
      throw error;
    }
  };

  removeSubjectGroup = async (id: number) => {
    try {
      return await agent.Branchs.removeSubjectGroup(id).then(() => {
        runInAction(() => {
          this.getCurriculumById(Number(this.currentBranchId));
        });
      });
    } catch (error) {
      throw error;
    }
  };

  removeSubSubjectGroup = async (id: number) => {
    try {
      return await agent.Branchs.removeSubSubjectGroup(id).then(() => {
        runInAction(() => {
          this.getCurriculumById(Number(this.currentBranchId));
        });
      });
    } catch (error) {
      throw error;
    }
  };
 
  removeGeneralTopic = async (id: number) => {
    try {
      return await agent.Branchs.removeGeneralTopic(id).then(() => {
        runInAction(() => {
          this.getCurriculumById(Number(this.currentBranchId));
        });
      });
    } catch (error) {
      throw error;
    }
  };
 
  removeSubGeneralTopic = async (id: number) => {
    try {
      return await agent.Branchs.removeSubGeneralTopic(id).then(() => {
        runInAction(() => {
          this.getCurriculumById(Number(this.currentBranchId));
        });
      });
    } catch (error) {
      throw error;
    }
  };
}
