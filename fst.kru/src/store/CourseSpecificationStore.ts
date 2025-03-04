import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import {
  CategoryCourseSpecification,
  CourseSpecification,
  Subjects,
} from "../models/CourseSpecification";

export class CourseSpecificationStore {
  AllcourseSpecification: CourseSpecification[] = [];
  courseSpecificationinBranch: CourseSpecification[] = [];
  courseSpecification: CourseSpecification[] = [];
  categoryCourseS: CategoryCourseSpecification[] = [];
  subjects: Subjects[] = [];
  categoryCourseSCount = [];

  constructor() {
    makeAutoObservable(this);
  }

  getAllCourseSpecifications = async () => {
    try {
      await agent.CourseSpecification.getAllCourseSpecifications().then((e) => {
        runInAction(() => {
          this.AllcourseSpecification = e;
        });
      });
    } catch (error) {
      throw error;
    }
  };

  getCourseSpecificationsById = async (id: number) => {
    try {
      await agent.CourseSpecification.getCourseSpecificationsById(id).then(
        (e) => {
          runInAction(() => {
            this.courseSpecificationinBranch = e;
          });
        }
      );
    } catch (error) {
      throw error;
    }
  };

  getCourseSpecificationByUser = async () => {
    try {
      await agent.CourseSpecification.getCourseSpecificationByUser().then(
        (e) => {
          runInAction(() => {
            this.courseSpecification = e;
          });
        }
      );
    } catch (error) {
      throw error;
    }
  };

  createUpdateCourseSpecification = async (values: any) => {
    try {
      await agent.CourseSpecification.createUpdateCourseSpecification(
        values
      ).then(() => {
        runInAction(() => {
          this.getCourseSpecificationByUser();
          this.getAllCourseSpecifications();
        });
      });
    } catch (error) {
      throw error;
    }
  };

  uploadFile = async (values: any) => {
    try {
      return await agent.CourseSpecification.uploadFile(values);
    } catch (error) {
      throw error;
    }
  };

  removeCourseSpecification = async (id: number) => {
    try {
      await agent.CourseSpecification.removeCourseSpecification(id).then(() => {
        runInAction(() => {
          this.getCourseSpecificationByUser();
          this.getAllCourseSpecifications();
        });
      });
    } catch (error) {
      throw error;
    }
  };

  //------------------------------------------------getCategoryCourseS-------------------------------------------//

  getCategoryCourseS = async () => {
    try {
      await agent.CourseSpecification.getCategoryCourseS().then((e) => {
        runInAction(() => {
          this.categoryCourseS = e;
        });
      });
    } catch (error) {
      throw error;
    }
  };

  getCountCategoryCourseSpecification = async () => {
    try {
      await agent.CourseSpecification.getCountCategoryCourseSpecification().then(
        (e) => {
          runInAction(() => {
            this.categoryCourseSCount = e;
          });
        }
      );
    } catch (error) {
      throw error;
    }
  };

  createUpdateCategoryCourseS = async (name: any) => {
    const createData: CategoryCourseSpecification = {
      id: 0,
      name: name,
    };

    try {
      await agent.CourseSpecification.createUpdateCategoryCourseS(
        createData
      ).then(() => {
        runInAction(() => {
          this.getCategoryCourseS();
        });
      });
    } catch (error) {
      throw error;
    }
  };

  removeCategoryCourseS = async (id: number) => {
    try {
      await agent.CourseSpecification.removeCategoryCourseS(id).then(() => {
        runInAction(() => {
          this.getCategoryCourseS();
        });
      });
    } catch (error) {
      throw error;
    }
  };

  //------------------------------------------------subjects-------------------------------------------//

  getSubjects = async () => {
    try {
      await agent.CourseSpecification.getSubjects().then((e) => {
        runInAction(() => {
          this.subjects = e;
        });
      });
    } catch (error) {
      throw error;
    }
  };

  createUpdateSubjects = async (courseCode: string, courseName: string) => {
    const createData: Subjects = {
      id: 0,
      courseCode: courseCode,
      courseName: courseName,
    };

    try {
      await agent.CourseSpecification.createUpdateSubjects(createData).then(
        () => {
          runInAction(() => {
            this.getSubjects();
          });
        }
      );
    } catch (error) {
      throw error;
    }
  };

  removeSubjects = async (id: number) => {
    try {
      await agent.CourseSpecification.removeSubjects(id).then(() => {
        runInAction(() => {
          this.getSubjects();
        });
      });
    } catch (error) {
      throw error;
    }
  };
}
