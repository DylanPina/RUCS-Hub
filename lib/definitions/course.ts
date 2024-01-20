export type Course = {
  courseId: string;
  courseName: string;
  courseNumber: string;
  prereqs: string[] | null;
  synopsisUrl: string | null;
  majors: string[] | null;
  prerequisites: string[];
  professors: string[];
  programmingLanguages?: string[] | null;
  terms: Term[];
  credits: number;
  meta: {
    exams: boolean;
    quizes: boolean;
    homework: boolean;
    projects: boolean;
    groupProjects: boolean;
    labs: boolean;
  };
};

export type CourseSection = {
  courseId: string;
  professorId: string;
  sectionNumber: string;
  index: string;
  open: boolean;
  meetingTimes: MeetingTimes[];
};

export type MeetingTimes = {
  campusLocation: string;
  roomNumber: number;
  meetingType: "LEC" | "REC";
  meetingDay: "M" | "T" | "W" | "TH" | "F";
  startTime: string;
  endTime: string;
  pmCode: "P" | "A";
};

export type CourseSynopsesListing = {
  courseCode: number;
  courseName: string;
  synopsisUrl: string;
};

export type CourseWebRegListing = {
  courseCode: number;
  title: string;
  year: number;
  term: Term;
  openSections: number;
  sections: CourseSection[];
  prereqs: number[];
  credits: number;
};

export type CourseTableColumn = {
  courseCode: number;
  courseName: string;
  credits: number;
  difficulty?: number;
  workload?: number;
  overall?: number;
  totalReviews?: number;
};

export enum Term {
  Winter = 0,
  Spring = 1,
  Summer = 7,
  Fall = 9,
}
