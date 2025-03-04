import agent from "../api/agent";
import { AnnualDirectorM, DirectorType } from "../models/AnnualDirectorM";
import { makeAutoObservable } from "mobx";
import { runInAction } from "mobx";
import { Director } from "../models/Director";
import { Position } from "../models/Position";

export class AnnualDirectorStore {
  annualDirectorByType: AnnualDirectorM[] = [];
  director: Director[] = [];
  directorPosition: Position[] = [];
  directorType: DirectorType[] = [];
  loading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setLoading = (state: boolean) => (this.loading = state);

  // -----------------------------------------AnnualDirector-------------------------------------------//

  getAnnualDirectorType = async () => {
    this.setLoading(true);
    try {
      await agent.AnnualDirectors.getAnnualDirectorType().then((e) => {
        runInAction(() => {
          this.annualDirectorByType = e;
          // .map((item: any) => ({
          //   id: item.directorType.id.toString(),
          //   name: item.directorType.name,
          //   director: item.directorType.annualDirectors.map(
          //     (director: AnnualDirectorM) => ({
          //       pdf: director.pdf,
          //       isUsed: director.isUsed,
          //       id: director.id,
          //       directorId: director.director.id,
          //       name: director.director.fullName,
          //       fullName: director.director.fullName,
          //       imageName: director.director.imageName,
          //       year: director.year,
          //       description: director.director.description,
          //       hidden: director.director.hidden,
          //       directorPositionId: director.director.directorPositionId,
          //       directorPosition: {
          //         id: director.director.directorPosition.id,
          //         positionName: director.director.directorPosition.positionName,
          //       },
          //     })
          //   ),
          //   annualDirector: item.directorType.annualDirectors.map(
          //     (director: AnnualDirectorM) => ({
          //       id: director.id.toString(),
          //       year: director.year,
          //       isUsed: director.isUsed,
          //       pdf: director.pdf,
          //       hidden: director.hidden,
          //       directorTypeId: director.directorTypeId,
          //       directorId: director.directorId,
          //       director: {
          //         id: director.director.id,
          //         fullName: director.director.fullName,
          //         imageName: director.director.imageName,
          //         isUsed: director.director.isUsed,
          //         description: director.director.description,
          //         hidden: director.director.hidden,
          //         directorPositionId: director.director.directorPositionId,
          //         directorPosition: {
          //           id: director.director.directorPosition.id,
          //           positionName:
          //             director.director.directorPosition.positionName,
          //         },
          //       },
          //     })
          //   ),
          // }));
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

  createUpdateAnnualDirector = async (values: any) => {
    try {
      return await agent.AnnualDirectors.createUpdateAnnualDirector(
        values
      ).then(() => {
        runInAction(() => {
          this.getAnnualDirectorType();
        });
      });
    } catch (error) {
      throw error;
    }
  };

  isUsedAnnDirector = async (id: number) => {
    console.log("id ", id);

    try {
      return await agent.AnnualDirectors.isUsedAnnDirector(id).then(() => {
        runInAction(() => {
          this.getAnnualDirectorType();
        });
      });
    } catch (error) {
      throw error;
    }
  };

  removeAnnualDirector = async (id: number) => {
    console.log("id", id);
    try {
      return await agent.AnnualDirectors.removeAnnualDirector(id).then(() =>
        runInAction(() => {
          this.getAnnualDirectorType();
        })
      );
    } catch (error) {
      throw error;
    }
  };

  uploadFileAnnualDirector = async (values: any) => {
    try {
      return await agent.AnnualDirectors.uploadFileAnnualDirector(values);
    } catch (error) {
      throw error;
    }
  };

  // -----------------------------------------directorType-------------------------------------------//

  getDirectorType = async () => {
    try {
      await agent.AnnualDirectors.getDirectorType().then((e) => {
        runInAction(() => {
          this.directorType = e;
        });
      });
    } catch (error) {
      throw error;
    }
  };

  getDirectorTypeById = async (id: number) => {
    this.setLoading(true);
    try {
      return await agent.AnnualDirectors.getDirectorTypeById(id).then((e) => {
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

  removeDirectorType = async (id: number) => {
    try {
      return await agent.AnnualDirectors.removeDirectorType(id).then(() =>
        runInAction(() => {
          this.getAnnualDirectorType();
        })
      );
    } catch (error) {
      throw error;
    }
  };

  isUsedDirectorType = async (id: number) => {
    console.log("id ", id);

    try {
      return await agent.AnnualDirectors.isUsedDirectorType(id).then(() => {
        runInAction(() => {
          this.getAnnualDirectorType();
        });
      });
    } catch (error) {
      throw error;
    }
  };

  // -----------------------------------------director-------------------------------------------//

  getDirector = async () => {
    try {
      await agent.AnnualDirectors.getDirector().then((e) => {
        runInAction(() => {
          this.director = e;
        });
      });
    } catch (error) {
      throw error;
    }
  };

  createUpdateDirector = async (values: any) => {
    try {
      return await agent.AnnualDirectors.createUpdateDirector(values).then(
        () => {
          runInAction(() => {
            this.getDirector();
          });
        }
      );
    } catch (error) {
      throw error;
    }
  };

  removeDirector = async (id: number) => {
    try {
      return await agent.AnnualDirectors.removeDirector(id).then(() =>
        runInAction(() => {
          this.getDirector();
        })
      );
    } catch (error) {
      throw error;
    }
  };

  isUsedDirector = async (id: number) => {
    console.log("id ", id);

    try {
      return await agent.AnnualDirectors.isUsedDirector(id);
    } catch (error) {
      throw error;
    }
  };

  // -----------------------------------------position-------------------------------------------//

  getDirectorPosition = async () => {
    try {
      await agent.AnnualDirectors.getDirectorPosition().then((e) => {
        runInAction(() => {
          this.directorPosition = e;
        });
      });
    } catch (error) {
      throw error;
    }
  };

  // createUpdatePosition = async (name: string) => {
  //   const createData: Position = {
  //     id: 0,
  //     positionName: name,
  //   };

  //   try {
  //     return await agent.AnnualDirectors.createUpdatePosition(createData).then(
  //       () => {
  //         runInAction(() => {
  //           this.getDirectorPosition();
  //         });
  //       }
  //     );
  //   } catch (error) {
  //     throw error;
  //   }
  // };

  removePosition = async (id: number) => {
    try {
      return await agent.AnnualDirectors.removePosition(id).then(() =>
        runInAction(() => {
          this.getDirectorPosition();
        })
      );
    } catch (error) {
      throw error;
    }
  };

  // -----------------------------------------another-------------------------------------------//

  uploadImage = async (values: any) => {
    try {
      return await agent.AnnualDirectors.uploadImage(values);
    } catch (error) {
      throw error;
    }
  };
}
