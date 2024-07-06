import { Prisma } from "@prisma/client";
import { Review } from "./review";

export type Course = Prisma.CourseGetPayload<{
  include: {
    reviews: true;
    sections: true;
    subscribers: true;
  };
}>;

export type CoursePage = {
  code: number;
  name: string;
  subjectCode: string;
  prereqs: string[];
  synopsisUrl: string;
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
  code: number;
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

export type CourseSynopsisListing = {
  code: number;
  name: string;
  synopsisUrl: string;
};

export type CourseWebRegListing = {
  subjectCode: string;
  code: number;
  title: string;
  year: number;
  term: Term;
  openSections: number;
  sections: CourseSection[];
  prereqs: string[];
  credits: number;
};

export type CourseTableColumn = {
  subjectCode: string;
  code: number;
  name: string;
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
