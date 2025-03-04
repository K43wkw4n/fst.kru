import { Consultant } from "./Consultant";
import { Student } from "./Student";

export interface Project {
  id: number;
  nameTH: string;
  nameEN: string;
  description: string;
  image: string;
  pdf: string;
  youtubeUrl: string;
  webUrl: string;
  githubUrl: string;
  keyWords: string;
  isUsed: boolean;
  createdAt?: Date;
  studentId: number;
  student?: Student;
  consultants: Consultant[];
}
