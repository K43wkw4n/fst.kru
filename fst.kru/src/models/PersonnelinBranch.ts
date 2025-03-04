import { Branch } from "./Branch";
import { personnel } from "./Personnel";
import { Position } from "./Position";

export interface PersonnelinBranch {
  id: number;
  personnelId: number;
  personnel: personnel;
  branchId: number;
  branch: Branch;
  positionId: number;
  position: Position;
  isUsed: number;
  hidden: boolean;
}
