import { personnel } from "./Personnel";

export interface Roles {
  id: number;
  roleName: string;
  personnels: personnel[];
}
