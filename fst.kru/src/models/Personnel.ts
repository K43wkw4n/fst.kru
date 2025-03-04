import { generalPosition } from "./GeneralPosition";
import { Prefix } from "./Prefix";

export interface personnel {
  id: number;
  fullName: string;
  image: string;
  expert: string;
  lvEdu: string;
  generalPositions: generalPosition;
  generalPositionId: number;
  roleID: number;
  prefixId: number;
  prefixes: Prefix;
  description: string;
}
