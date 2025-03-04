import { Student } from "./Student";

export interface JobHistoryM {
  // [x: string]: any;
  id: number;
  jobName: string;
  position: string;
  startJob: Date;
  company: string;
  description: string;
  createdAt: Date;
  isUsed: boolean;
  studentId: number;
  student: Student;
}
