export type Course = {
  courseId: string; // Unique indetifier for the course
  courseName: string; // Name of the course
  courseNumber: string; // Course ID
  textbookNames: string[] | null; // Names of texbooks
  prereqs: string[] | null; // Prerequisites for the course
  synopsisUrl: string | null; // URL for course synopsis
  majors: string[] | null; // Required major(s)
  prerequisites: string[]; // Course prereqa
  professors: string[]; // Professors who have taught the course (foreign keys)
  core: boolean; // Is course required for CS degree
  elective: boolean; // Is course a CS elective
  programmingLanguages: string[] | null; // Programming langauges used in course
  // Meta data for the class
  meta: {
    exams: boolean; // Course has exams
    quizes: boolean; // Course has quizes
    homework: boolean; // Course has homework assignments
    projects: boolean; // Course has projects
    groupProjects: boolean; // Course has group projects
    labs: boolean; // Course has labs
  };
  terms: Term[]; // terms the course is offered
  credits: number; // # of credits
};

export type CourseSection = {
  courseId: string; // Course ID this section belongs to (foreign key)
  professorId: string; // Professor of the course (foreign key)
  sectionNumber: string; // Section number
  index: string; // Section index number
  open: boolean; // Is this section open
  meetingTimes: MeetingTimes[]; // Meeting times for course section
};

export type MeetingTimes = {
  campusLocation: string; // Name of the campus
  roomNumber: number; // Room number
  meetingType: "LEC" | "REC"; // "LEC" for lecture, "REC" for recitation
  meetingDay: "M" | "T" | "W" | "TH" | "F"; // Meeting day
  startTime: string; // Start time
  endTime: string; // End time
  pmCode: "P" | "A"; // 'P' if time is in PM, 'A' if time is in AM
};

export enum Term {
  Winter = 0,
  Spring = 1,
  Summer = 7,
  Fall = 9,
}

export type CourseSynopsesListing = {
  courseCode: number;
  courseName: string;
  synopsisUrl: string;
};

export type CourseWebRegListing = {
  courseCode: number;
  openSections: number;
  sections: CourseSection[];
  prereqs: number[];
  credits: number;
};

export type CourseTableEntry = {
  courseCode: number;
  courseName: string;
  credits: number;
  difficulty?: number;
  workload?: number;
  overall?: number;
  totalReviews?: number;
};
