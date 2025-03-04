export interface Student {
  id: number;
  fullName: string;
  userName: string;
  passwordHash: string;
  image: string;
  isUsed: number;
  yearEdu: string;
  address: string;
  createdAt: Date;
  branchId: number;
  hidden: boolean;
}
