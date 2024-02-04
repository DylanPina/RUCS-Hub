import { Review } from "@prisma/client";

export type Course = {
  courseCode: number;
  courseName: string;
  synopsisUrl: string | null;
  offered: [number, Term][];
  prereqs: string[] | null;
  credits: number;
  sections: CourseSection[];
};

export type CoursePage = {
  courseCode: number;
  courseName: string;
  credits: number;
  rating: number;
  difficulty: number;
  professorQualityRating: number;
  lectureRating: number;
  workload: number;
  bookRating: number;
  piazzaRating: number;
  reviews: Review[];
};

export type CourseSection = {
  courseCode: number;
  year: number;
  term: number;
  webRegCourseSection: WebRegCourseSection;
};

export type WebRegCourseSection = {
  sectionEligibility?: boolean;
  sessionDatePrintIndicator: string;
  examCode: string;
  specialPermissionAddCode?: string;
  crossListedSections?: string[];
  sectionNotes?: string;
  specialPermissionDropCode?: string;
  instructors: string[];
  number: string;
  majors?: string[];
  sessionDates?: string[];
  specialPermissionDropCodeDescription?: string;
  subtopic?: string;
  openStatus: boolean;
  comments?: any[];
  minors?: string[];
  campusCode: string;
  index: string;
  unitMajors?: string[];
  printed: string;
  specialPermissionAddCodeDescription?: string;
  subtitle?: string;
  meetingTimes: MeetingTimes[];
  legendKey?: string;
  honorPrograms?: string[];
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
  prereqs: string[];
  credits: number;
};

export type CourseTableColumn = {
  courseCode: number;
  courseName: string;
  credits?: number;
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
