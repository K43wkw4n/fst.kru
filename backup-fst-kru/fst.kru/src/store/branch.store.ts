import { makeAutoObservable, reaction, runInAction } from "mobx";
import agent from "../api/agent";
import { Curriculums } from "../models/Curriculum";
import { Welearn } from "../models/Welearn";
import { Section } from "../models/Section";
import { NewsM } from "../models/NewsM";
import { SlideShow } from "../models/SlideShow";
import Logo from "../assets/images/KRU.png";
import { Kru } from "../constants/Kru";

export const dataMock = {
  id: 0,
  branchName: "กรุณารอสักครู่...",
  logo: Kru.fst,
  // logo: "https://www.kru.ac.th/kru/assets/img/kru/logo/kru_color.png",
  pageFacebook: "",
  videoUrl: JSON.stringify([]),
  branchId: 0,

  categoryBranch: "",
  categoryMajor: "",
  text: "",
};

interface dataMock {
  id: number;
  branchName: string;
  logo: string;
  pageFacebook: string;
  branchId: number;
  videoUrl: string;

  categoryBranch: string;
  categoryMajor: string;
  text: string;
}

interface CounAdmin {
  userCount: number;
  jobHistoryCount: number;
  researchCount: number;
  projectCount: number;
  newsCount: number;
}

export class BranchStore {
  branch: dataMock[] = []; //dropdown ทุกตัว
  currentBranch: dataMock = dataMock; //ตัวเดียว
  currentBranchId: string | null = window.localStorage.getItem("currentBranch"); //get async
  // systemSettings: any = dataMock;
  slideShow: SlideShow[] = [];
  welearn: Welearn[] = [];
  news: NewsM[] = [];
  curriculum: Curriculums[] = [];
  section: Section[] = [];
  sectionAdmin: Section[] = [];
  loading: boolean = false;
  countAdmin: CounAdmin | null = null;
  openMenuAdmin: boolean = false;
  paramsSelectMenu: string = "1";

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

    const params = new URLSearchParams(location.search);
    this.paramsSelectMenu = params.get("menu") || "1";
  }

  setParamsSelectMenu = (state: string) => (this.paramsSelectMenu = state);

  setOpenMenuAdmin = (state: boolean) => (this.openMenuAdmin = state);

  setLoading = (state: boolean) => (this.loading = state);

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

  getCountAdminById = async (id: number) => {
    try {
      await agent.Branchs.getCountAdminById(id).then((e) => {
        runInAction(() => {
          this.countAdmin = e;
        });
      });
    } catch (error) {
      throw error;
    }
  };

  getBranchs = async () => {
    this.setLoading(true);
    try {
      await agent.Branchs.getBranch().then((e) => {
        runInAction(() => {
          this.branch = e; //dropdown
        });
      });

      this.setLoading(false);
    } catch (error) {
      runInAction(() => {
        this.setLoading(true);
      });
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
          this.getCurrentBranch();
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
    this.setLoading(true);
    try {
      await agent.Branchs.getNewsById(id).then((e: any) => {
        runInAction(() => {
          this.news = e;
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

  getNewsAdminById = async (id: number) => {
    this.setLoading(true);
    try {
      await agent.Branchs.getNewsAdminById(id).then((e: any) => {
        runInAction(() => {
          this.news = e;
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

  createUpdateNews = async (values: any, formfiles: any) => {
    try {
      await agent.Branchs.createUpdateNews(values, formfiles);

      runInAction(() => {
        this.getNewsAdminById(Number(this.currentBranchId));
      });
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
      return await agent.Branchs.getCurriculumById(id).then((e: any) => {
        runInAction(() => {
          this.curriculum = e;
        });

        return e;
      });
    } catch (error) {
      throw error;
    }
  };

  getCurriculumByIdAdmin = async (id: number) => {
    try {
      return await agent.Branchs.getCurriculumByIdAdmin(id).then((e: any) => {
        runInAction(() => {
          this.curriculum = e;
        });

        return e;
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

  //--------------------------------------------------general----------------------------------------------
  //--------------------------------------------------section----------------------------------------------

  getSectionAdmin = async () => {
    try {
      return await agent.Branchs.getSectionAdmin().then((e: any) => {
        runInAction(() => {
          this.sectionAdmin = e;
        });

        return e;
      });
    } catch (error) {
      throw error;
    }
  };

  getSection = async () => {
    try {
      return await agent.Branchs.getSection().then((e: any) => {
        runInAction(() => {
          this.section = e;
        });

        return e;
      });
    } catch (error) {
      throw error;
    }
  };

  createUpdateSection = async (values: any) => {
    try {
      return await agent.Branchs.createUpdateSection(values);
    } catch (error) {
      throw error;
    }
  };

  removeSection = async (id: number) => {
    try {
      return await agent.Branchs.removeSection(id).then(() => {
        runInAction(() => {
          this.getSectionAdmin();
        });
      });
    } catch (error) {
      throw error;
    }
  };

  removeSubsection = async (id: number) => {
    try {
      return await agent.Branchs.removeSubsection(id).then(() => {
        runInAction(() => {
          this.getSectionAdmin();
        });
      });
    } catch (error) {
      throw error;
    }
  };

  uploadFileSection = async (values: any) => {
    try {
      return await agent.Branchs.uploadFileSection(values);
    } catch (error) {
      throw error;
    }
  };

  isUsedSection = async (id: number) => {
    try {
      await agent.Branchs.isUsedSection(id).then(() => {
        runInAction(() => {
          this.getSectionAdmin;
        });
      });
    } catch (error) {
      throw error;
    }
  };
}
