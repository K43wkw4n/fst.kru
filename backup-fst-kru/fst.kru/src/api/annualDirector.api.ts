import { createFormData, requests } from "./agent";

export const AnnualDirectors = {
  // -----------------------------------------AnnualDirector-------------------------------------------//
  getAnnualDirectorType: () => requests.get("AnnualDirector/GetAnnualDirector"),
  createUpdateAnnualDirector: (values: any) =>
    requests.post("AnnualDirector/CreateUpdateAnnualDirector", values),
  removeAnnualDirector: (id: number) =>
    requests.delete(`AnnualDirector/RemoveAnnualDirector?annDirectorId=${id}`),
  isUsedAnnDirector: (id: number) =>
    requests.onlyPost(`AnnualDirector/IsUsedAnnDirector?annDirectorId=${id}`),
  uploadFileAnnualDirector: (values: any) =>
    requests.post(
      "AnnualDirector/UploadFileAnnDirector",
      createFormData(values)
    ),

  // -----------------------------------------directorType-------------------------------------------//

  getDirectorType: () => requests.get("AnnualDirector/GetDirectorType"),
  getDirectorTypeById: (id: number) =>
    requests.get(`AnnualDirector/GetDirectorTypeById?directorTypeId=${id}`),
  removeDirectorType: (id: number) =>
    requests.delete(`AnnualDirector/RemoveDirectorType?directorTypeId=${id}`),
  isUsedDirectorType: (id: number) =>
    requests.onlyPost(`AnnualDirector/IsUsedDirectorType?directorTypeId=${id}`),

  // -----------------------------------------director-------------------------------------------//

  getDirector: () => requests.get("AnnualDirector/GetDirector"),
  createUpdateDirector: (values: any) =>
    requests.post("AnnualDirector/CreateUpdateDirector", values),
  removeDirector: (id: number) =>
    requests.delete(`AnnualDirector/RemoveDirector?directorId=${id}`),
  isUsedDirector: (id: number) =>
    requests.onlyPost(`AnnualDirector/IsUsedDirector?directorId=${id}`),

  // -----------------------------------------position-------------------------------------------//

  getDirectorPosition: () => requests.get("AnnualDirector/GetDirectorPosition"),
  createUpdatePosition: (values: any) =>
    requests.post("AnnualDirector/CreateUpdateDirectorPosition", values),
  removePosition: (id: number) =>
    requests.delete(
      `AnnualDirector/RemoveDirectorPosition?directorPositionId=${id}`
    ),

  // -----------------------------------------another-------------------------------------------//

  uploadImage: (values: any) =>
    requests.post("AnnualDirector/UploadImage", createFormData(values)),
};
