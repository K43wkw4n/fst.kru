export interface Curriculums {
  id: number;
  curriculumTH: string;
  curriculumEN: string;
  year: Date;
  file: string;
  branchId: number;
  generalTopics: GeneralTopics[];
  subjectGroups: SubjectGroups[];
}

export interface GeneralTopics {
  id: number;
  name: string;
  isUsed: number;
  curriculumId: number;
  subGeneralTopics: SubGeneralTopics[];
}

export interface SubGeneralTopics {
  id: number;
  name: string;
  generalTopicId: number;
}

export interface SubjectGroups {
  id: number;
  name: string;
  curriculumId: number;
  subSubjectGroups: SubSubjectGroups[];
}

export interface SubSubjectGroups {
  id: number;
  name: string;
  credit: number;
  subjectGroupId: number;
}
