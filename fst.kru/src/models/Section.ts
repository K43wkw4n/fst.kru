export interface Section {
  id: number;
  name: string;
  createdAt: Date;
  isUsed: boolean;
  hidden: boolean;

  subsections: Subsection[];
}

export interface Subsection {
  id: number;
  name: string;
  pdf: string;
  createdAt: Date;
  isUsed: boolean;
  hidden: boolean;

  sectionId: number;
  section: Section;
}
