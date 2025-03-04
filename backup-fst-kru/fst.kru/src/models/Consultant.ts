import { personnel } from "./Personnel";

export interface Consultant {
  id: number;
  projectId: number;
  personnelId: number;
  personnel: personnel;
}
