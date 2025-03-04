import { createFormData, requests } from "./agent";

export const ResearchAndProject = {
  getResearchAndProjectById: (id: number) =>
    requests.get(`ResearchAndProject/GetResearchAndProjectById?branchId=${id}`),
  getResearchAndProjectByIdAdmin: (id: number) =>
    requests.get(
      `ResearchAndProject/GetResearchAndProjectByIdAdmin?branchId=${id}`
    ),
  getResearchAndProjectByUser: () =>
    requests.get("ResearchAndProject/GetResearchAndProjectByUser"),
  getResearchAndProjectByUserId: (id: number) =>
    requests.get(
      "ResearchAndProject/GetResearchAndProjectByUserId?userId=" + id
    ),

  searchResearchAndProject: (
    branchId: number | null,
    category: string | null,
    search: string | null
  ) =>
    requests.get(
      `ResearchAndProject/SearchResearchAndProject?branchId=${branchId}${category}${search}`
    ),
  createUpdateRAP: (values: any) =>
    requests.post("ResearchAndProject/CreateUpdateRAP", values),
  removeRAP: (id: number) =>
    requests.delete(`ResearchAndProject/RemoveRAP?researchId=${id}`),

  isUsedResearch: (id: number) =>
    requests.onlyPost(`ResearchAndProject/IsUsedResearch?researchId=${id}`),

  uploadFile: (values: any) =>
    requests.post("ResearchAndProject/UploadFile", createFormData(values)),
  uploadImage: (values: any) =>
    requests.post("ResearchAndProject/uploadImage", createFormData(values)),
  //--------------------------------------------category-----------------------------------------------//

  getCategory: () => requests.get("ResearchAndProject/GetCategory"),
  getCategoryNameDDByBranchByGroup: (id: number | null) =>
    requests.get(
      `ResearchAndProject/GetCategoryNameDDByBranchByGroup?branchId=${id}`
    ),
  ctreateUpdateCategory: (values: any) =>
    requests.post("ResearchAndProject/CtreateUpdateCategory", values),
  removeCategory: (id: number) =>
    requests.delete(`ResearchAndProject/RemoveCategory?categoryId=${id}`),
};
