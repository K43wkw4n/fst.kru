import { Branch } from "./Branch";

export interface NewsM {
  id: number;
  title: string;
  imageName: string | null;
  body: string;
  isUsed: boolean;
  createdAt: Date;
  branchId: number;
  branch: Branch;
  hidden: boolean;
}
