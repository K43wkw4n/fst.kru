import { personnel } from "./Personnel";
import { PersonnelinBranch } from "./PersonnelinBranch";

export interface CourseSpecification {
  id: number;
  semester: string;
  pdf: string;
  createdAt: Date;
  hidden: boolean;
  personnelId: number;
  personnel: personnel;
  categoryCourseSpecificationId: number;
  categoryCourseSpecification: CategoryCourseSpecification;
  subjectsId: number;
  subjects: Subjects;

  yearEdu: string;
  credit: number;
  studyGroup: string;
  studentsAmount: number;

  personnelinBranch: PersonnelinBranch[];
}

export interface CategoryCourseSpecification {
  id: number;
  name: string;
}

export interface Subjects {
  id: number;
  courseCode: string;
  courseName: string;
}
