import { Branch } from "./Branch";

export interface SlideShow {
  id: number;
  slideShowName: string;
  imageName: string;
  branchId: number;
  branch: Branch;

  hidden: boolean;
}
