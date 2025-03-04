import { Director } from "./Director";

export interface AnnualDirectorM {
  id: number;
  year: Date;
  isUsed: boolean;
  pdf: string;
  hidden: boolean;
  directorTypeId: number;
  directorType: DirectorType;
  directorId: number;
  director: Director;
}

export interface DirectorType {
  id: number;
  name: string;

  annualDirectors: AnnualDirectorM[];
}
