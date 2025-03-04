import { Position } from "./Position";

export interface Director {
  id: number;
  fullName: string;
  imageName: string;
  isUsed: boolean;
  description: string;
  hidden: boolean;
  positionId: number;
  position: Position;
}

export interface DirectorPosition {
  id: number;
  positionName: string;
}
