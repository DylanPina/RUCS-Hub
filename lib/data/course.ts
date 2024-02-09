import {
  CourseSynopsesListing,
  CourseWebRegListing,
  CourseTableColumn,
  CourseSection,
  Term,
  CoursePage,
} from "@/lib/definitions/course";
import {
  getTerms,
  getValidYearTermMap,
  getYears,
  parseProfessorName,
  validateCourseTermYear,
} from "@/lib/utils";
import {
  COURSE_SYNOPSES_URL,
  RUTGERS_CS_URL,
  WEBREG_BASE_URL,
} from "@/lib/constants";
import { JSDOM } from "jsdom";
import { Course, PrismaClient, Review } from "@prisma/client";
import { createProfessorNameIdMap } from "./professor";

/**
 * Queries a course by courseId
 *
 * @param courseCode - Course code of the course we are trying to fetch
 * @return - Course
 */
export async function queryCourseByCode(
  courseCode: number,
): Promise<CoursePage> {
  const prisma = new PrismaClient();
  const course: Course | null = await prisma.course.findUnique({
    where: {
      code: courseCode,
    },
    include: {
      reviews: true,
    },
  });

  if (!course) {
    console.error(`Failed to find course with code ${courseCode}`);
  }

  return getCoursePageRatings(course);
}

/**
 *  Queries all courses
 *
 *  @return - List of all courses
 */
export async function queryAllCourses(): Promise<Course[]> {
  const prisma = new PrismaClient();
  const courses: Course[] = await prisma.course.findMany({
    include: {
      reviews: true,
    },
  });

  if (!courses) {
    console.error("Failed to find any courses");
  }

  return courses;
}

/**
 * Queries all course table listings
 *
 * @return - List of all course table listings
 */
export async function queryAllCourseTableListings(): Promise<
  CourseTableColumn[]
> {
  const prisma = new PrismaClient();
  const courses: Course[] = await prisma.course.findMany({
    include: {
      reviews: true,
    },
  });

  if (!courses) {
    console.error("Failed to find any courses");
    return [];
  }

  return courses.map((course: Course) => getCourseTableRatings(course));
}

/**
 * Query course table data based on the given year and term
 *
 * @param year - Year the courses were offered (or null or all)
 * @param term - Term the courses were offered (or null or all)
 * @return - Course table data for the courses based on year and terms
 */
export async function queryCourseTableDataByYearTerm(
  year: number | null,
  term: Term | null,
): Promise<CourseTableColumn[]> {
  const prisma = new PrismaClient();
  const courses: Course[] = await prisma.course.findMany({
    include: {
      reviews: true,
      sections: true,
    },
  });

  if (!courses) {
    console.error("Failed to find any courses");
    return [];
  }

  if (year !== null && term !== null) {
    return courses
      .filter((course: any) =>
        course.sections.some(
          (section: CourseSection) =>
            section.term === term && section.year === year,
        ),
      )
      .map((course: any) => getCourseTableRatings(course));
  } else if (year !== null) {
    return courses
      .filter((course: any) =>
        course.sections.some((section: CourseSection) => section.year === year),
      )
      .map((course: any) => getCourseTableRatings(course));
  } else if (term !== null) {
    return courses
      .filter((course: any) =>
        course.sections.some((section: CourseSection) => section.term === term),
      )
      .map((course: any) => getCourseTableRatings(course));
  } else {
    return courses.map((course: any) => getCourseTableRatings(course));
  }
}

/**
 * Returns overall ratings for a course based on its reviews to display on the course page
 *
 * @param course - Course we are interested
 */
function getCoursePageRatings(course: any): CoursePage {
  const reviews: Review[] = course.reviews;
  const overallRatingSum = reviews.reduce(
    (acc, review) => acc + (review.rating ?? 0),
    0,
  );
  const averageRating =
    reviews.length > 0 ? overallRatingSum / reviews.length : 0;

  const reviewsWithDifficultyRating: Review[] = reviews.filter(
    (review: Review) => review.difficultyRating !== null,
  );
  const difficultyRatingSum = reviewsWithDifficultyRating.reduce(
    (acc, review) => acc + (review.difficultyRating ?? 0),
    0,
  );
  const averageDifficultyRating =
    reviewsWithDifficultyRating.length > 0
      ? difficultyRatingSum / reviewsWithDifficultyRating.length
      : 0;

  const reviewsWithWorkload: Review[] = reviews.filter(
    (review: Review) => review.workload !== null,
  );
  const workloadSum = reviewsWithWorkload.reduce(
    (acc, review) => acc + (review.workload ?? 0),
    0,
  );
  const averageWorkload =
    reviewsWithWorkload.length > 0
      ? workloadSum / reviewsWithWorkload.length
      : 0;

  const reviewsWithProfessorQualityRating: Review[] = reviews.filter(
    (review: Review) => review.professorQualityRating !== null,
  );
  const professorQualityRatingSum = reviewsWithProfessorQualityRating.reduce(
    (acc, review) => acc + (review.professorQualityRating ?? 0),
    0,
  );
  const averageProfessorQualityRating =
    reviewsWithProfessorQualityRating.length > 0
      ? professorQualityRatingSum / reviewsWithProfessorQualityRating.length
      : 0;

  const reviewsWithLectureRating: Review[] = reviews.filter(
    (review: Review) => review.lectureRating !== null,
  );
  const lectureRatingSum = reviewsWithLectureRating.reduce(
    (acc, review) => acc + (review.lectureRating ?? 0),
    0,
  );
  const averageLectureRating =
    reviewsWithLectureRating.length > 0
      ? lectureRatingSum / reviewsWithLectureRating.length
      : 0;

  const reviewsWithBookRating: Review[] = reviews.filter(
    (review: Review) => review.bookRating !== null,
  );
  const bookRatingSum = reviewsWithBookRating.reduce(
    (acc, review) => acc + (review.bookRating ?? 0),
    0,
  );
  const averageBookRating =
    reviewsWithBookRating.length > 0
      ? bookRatingSum / reviewsWithBookRating.length
      : 0;

  const reviewsWithPiazzaRating: Review[] = reviews.filter(
    (review: Review) => review.piazzaRating !== null,
  );
  const piazzaRatingSum = reviewsWithPiazzaRating.reduce(
    (acc, review) => acc + (review.piazzaRating ?? 0),
    0,
  );
  const averagePiazzaRating =
    reviewsWithPiazzaRating.length > 0
      ? piazzaRatingSum / reviewsWithPiazzaRating.length
      : 0;

  return {
    courseCode: course.code,
    courseName: course.name,
    prereqs: course.prereqs,
    credits: course.credits,
    rating: reviews.length ? averageRating : -1,
    difficulty: reviewsWithDifficultyRating.length
      ? averageDifficultyRating
      : -1,
    professorQualityRating: reviewsWithProfessorQualityRating.length
      ? averageProfessorQualityRating
      : -1,
    lectureRating: reviewsWithLectureRating.length ? averageLectureRating : -1,
    bookRating: reviewsWithBookRating.length ? averageBookRating : -1,
    piazzaRating: reviewsWithPiazzaRating.length ? averagePiazzaRating : -1,
    workload: reviewsWithWorkload.length ? averageWorkload : -1,
    reviews,
  };
}

/**
 * Returns overall ratings for a course based on its reviews to display on the course table
 *
 * @param course - Course we are interested
 * @return - Overall ratings for that course
 */
function getCourseTableRatings(course: any): any {
  const reviews: Review[] = course.reviews;
  const reviewsWithDifficultyRating: Review[] = reviews.filter(
    (review: Review) => review.difficultyRating !== null,
  );
  const reviewsWithWorkload: Review[] = reviews.filter(
    (review: Review) => review.workload !== null,
  );

  const overallRatingSum = reviews.reduce(
    (acc, review) => acc + (review.rating ?? 0),
    0,
  );
  const averageRating =
    reviews.length > 0 ? overallRatingSum / reviews.length : 0;

  const difficultyRatingSum = reviewsWithDifficultyRating.reduce(
    (acc, review) => acc + (review.difficultyRating ?? 0),
    0,
  );
  const averageDifficultyRating =
    reviewsWithDifficultyRating.length > 0
      ? difficultyRatingSum / reviewsWithDifficultyRating.length
      : 0;

  const workloadSum = reviewsWithWorkload.reduce(
    (acc, review) => acc + (review.workload ?? 0),
    0,
  );
  const averageWorkload =
    reviewsWithWorkload.length > 0
      ? workloadSum / reviewsWithWorkload.length
      : 0;

  return {
    courseCode: course.code,
    courseName: course.name,
    credits: course.credits,
    rating: reviews.length ? averageRating : -1,
    difficulty: reviewsWithDifficultyRating.length
      ? averageDifficultyRating
      : -1,
    workload: reviewsWithWorkload.length ? averageWorkload : -1,
    reviews: reviews.length,
  };
}

/**
 * Fetches course table data based on the given year and term
 *
 * @param year - Year the courses were offered (or null or all)
 * @param term - Term the courses were offered (or null or all)
 * @return - Course table data for the courses based on year and term
 */
export async function fetchCourseTableData(
  year: number | null,
  term: Term | null,
): Promise<CourseTableColumn[]> {
  if (year !== null && term !== null) {
    return await fetchCourseTableListingsByYearTerm(year, term);
  } else if (term !== null && year === null) {
    return await fetchCourseTableListingsByTerm(term);
  } else if (term === null && year !== null) {
    return await fetchCourseTableListingByYear(year);
  } else {
    return await fetchAllCourseTableListings();
  }
}

/**
 * Fetches all courses from Rutgers CS webreg listing for all documented years and semesters.
 *
 * @return - A list of all the documented courses from documented years and semesters.
 */
export async function fetchAllCourseTableListings(): Promise<
  CourseTableColumn[]
> {
  const validYearTermMap: Map<number, Term[]> = getValidYearTermMap();

  const courseTableListings: Promise<CourseTableColumn[]>[] = [];
  validYearTermMap.forEach((terms: Term[], year: number) => {
    terms.forEach((term: Term) => {
      const courseTableListing = fetchCourseTableListingsByYearTerm(year, term);
      courseTableListings.push(courseTableListing);
    });
  });

  return mergeCourseListings(await Promise.all(courseTableListings));
}

/**
 * Fetches courses from Rutgers CS webreg listing for a given term
 *
 * @param term - The term we are interested in
 * @return - A list of all the documented courses from that term
 */
async function fetchCourseTableListingsByTerm(
  term: Term,
): Promise<CourseTableColumn[]> {
  const years: number[] = getYears();
  const courseTableListings: Promise<CourseTableColumn[]>[] = [];

  years.forEach((year: number) => {
    const courseTableListing = fetchCourseTableListingsByYearTerm(year, term);
    courseTableListings.push(courseTableListing);
  });

  return mergeCourseListings(await Promise.all(courseTableListings));
}

/**
 * Fetches courses from Rutgers CS webreg listing for a given year
 *
 * @param year - The year we are interested in
 * @return - A list of all the documented courses from that year
 */
async function fetchCourseTableListingByYear(
  year: number,
): Promise<CourseTableColumn[]> {
  const terms: Term[] = getTerms();
  const courseTableListings: Promise<CourseTableColumn[]>[] = [];

  terms.forEach((term: Term) => {
    const courseTableListing = fetchCourseTableListingsByYearTerm(year, term);
    courseTableListings.push(courseTableListing);
  });

  return mergeCourseListings(await Promise.all(courseTableListings));
}

/**
 * Fetches all courses from Rutgers CS webreg listing for a given year and semester.
 *
 * @param year - Year the course is/was offered (2022 - 2024)
 * @param term - Term it is/was offered
 * @return - List of courses offered for that specific year and term
 */
async function fetchCourseTableListingsByYearTerm(
  year: number,
  term: Term,
): Promise<CourseTableColumn[]> {
  const courseSynposesListing = await parseSynposesListing();
  const courseWebRegListing = await parseWebRegListingByYearTerm(year, term);
  const combinedCourseListings = combineCourseListings(
    courseSynposesListing,
    courseWebRegListing,
  );

  return combinedCourseListings;
}

/**
 * Parses the API request from webreg listing all of the CS courses for a given year and term
 *
 * @param year - Year the course is/was offered (2022 - 2024)
 * @param term - Term it is/was offered
 * @return - List of course webreg listings
 */
export async function parseWebRegListingByYearTerm(
  year: number,
  term: Term,
): Promise<CourseWebRegListing[]> {
  if (!validateCourseTermYear(year, term)) {
    throw new Error(`Failed to parse WebReg courses for ${year} ${term}`);
  }

  const endpoint = `${WEBREG_BASE_URL}&semester=${term.valueOf()}${year}&campus=NB&level=UG`;
  try {
    const res = await fetch(endpoint);

    if (!res.ok) {
      throw new Error(`Failed to fetch webreg listing from ${endpoint}`);
    }

    const courseListingJson = await res.json();
    return courseListingJson.map((courseListing: any) => {
      return {
        courseCode: Number(courseListing.courseNumber),
        title: courseListing.title,
        year: year,
        term: term,
        openSections: courseListing.openSections,
        sections: courseListing.sections.map((section: any) => ({
          sectionNumber: section.number,
          professorName: section.instructors,
          index: section.index,
          open: section.openStatus,
          meetingTimes: section.meetingTimes,
        })),
        prereqs: courseListing.preReqNotes
          ? parsePrereqNotes(courseListing.preReqNotes)
          : [],
        credits: courseListing.credits,
      };
    });
  } catch (error) {
    console.error(
      `Failed to parse synposes listing from ${COURSE_SYNOPSES_URL} - ${error}`,
    );
    return [];
  }
}

/**
 * Fetches WebReg listings for a particular course for all years and terms
 *
 * @return - List of course names and open sections
 */
export async function fetchAllWebRegListings(): Promise<CourseWebRegListing[]> {
  const validYearTermMap: Map<number, Term[]> = getValidYearTermMap();

  const courseWebRegListings: Promise<CourseWebRegListing[]>[] = Array.from(
    validYearTermMap,
  ).flatMap(([year, terms]: [number, Term[]]) => {
    return terms.map((term: Term) => parseWebRegListingByYearTerm(year, term));
  });

  const listings = await Promise.all(courseWebRegListings);
  return listings.flat();
}

/**
 * Parses the HTML for the course synposes listing to return a list of course names and their IDs
 *
 * @param courseSynposesHtml - HTML for the course synposes website
 * @return - An array of course synposes listings
 */
async function parseSynposesListing(): Promise<CourseSynopsesListing[]> {
  try {
    const res = await fetch(COURSE_SYNOPSES_URL);

    if (!res.ok) {
      throw new Error(
        `Error fetching synposes listing from ${COURSE_SYNOPSES_URL}`,
      );
    }

    const html = await res.text();
    const dom = new JSDOM(html);
    const document = dom.window.document;

    const courseElements = document.querySelectorAll(
      ".latestnews-item .newstitle a",
    );

    const courses: any[] = [];
    courseElements.forEach((element: Element) => {
      const courseString = element.textContent?.trim() || "";
      const synopsisUrl = `${RUTGERS_CS_URL}${
        element.getAttribute("href") || ""
      }`;

      const [courseCode, courseName] = parseCourseCodeNameString(courseString);
      courses.push({ courseCode, courseName, synopsisUrl });
    });

    return courses;
  } catch (error) {
    console.error(
      `Error parsing synposes listing from ${COURSE_SYNOPSES_URL}: ${error}`,
    );
    return [];
  }
}

/**
 * Fetches the synposes listing for a particular course given the courses ID
 *
 * @param courseId - Course ID for the course we are interested in
 * @return - Synposes listing for that course
 */
export async function fetchSynposesListingById(
  courseId: number,
): Promise<CourseSynopsesListing> {
  const courseSynposesListings: CourseSynopsesListing[] =
    await parseSynposesListing();

  const courseSynposesListing: CourseSynopsesListing =
    courseSynposesListings.filter(
      (listing: CourseSynopsesListing) => listing.courseCode == courseId,
    )[0];

  return courseSynposesListing;
}

/**
 * Parses a string containing the full course code and course name
 * (ex: "01:198:103 - Introduction to Computer Skills")
 *
 * @param courseSynposesString - String rerepesnting the listing on course synposes list
 * @return - Parsed course ID and course title (ex [103, "Introduction to Computer Skills"])
 */
function parseCourseCodeNameString(courseCodeName: string): [number, string] {
  const normalizedString = courseCodeName.replace(/-/g, " - ");

  let parts = normalizedString.split(/\s-\s/);

  if (parts.length === 1) {
    parts = normalizedString.split(" ");
  }

  const idPart = parts.shift();
  const match = idPart ? idPart.match(/\d{3}(?=\D*$)/) : null;
  const courseCode = match ? parseInt(match[0]) : -1;
  const courseName = parts.join(" ").trim();

  return [courseCode, courseName];
}

/**
 * Combines data from course listings from synpopses and webreg
 *
 * @param courseSynposesListing - Course listings from synposes RUCS website
 * @param courseWebRegListing - Course listings from RUCS WebReg
 * @return - An array of course table entries based on these two listings
 */
function combineCourseListings(
  courseSynposesListing: CourseSynopsesListing[],
  courseWebRegListing: CourseWebRegListing[],
): CourseTableColumn[] {
  return courseWebRegListing.map((webReg: CourseWebRegListing) => {
    const synposes = courseSynposesListing.find(
      (x: CourseSynopsesListing) => x.courseCode == webReg.courseCode,
    );

    return {
      courseCode: webReg.courseCode,
      courseName: synposes?.courseName || webReg.title,
      credits: webReg.credits,
      synopsisUrl: synposes?.synopsisUrl || "",
      prereqs: webReg.prereqs,
    };
  });
}

/**
 * Merges coures listings from different years and terms into one course listing
 *
 * @param courseListings - A list of course listings to merge together
 * @return - One combined course listing with no duplicates
 */
function mergeCourseListings(
  courseListings: CourseTableColumn[][],
): CourseTableColumn[] {
  const mergedCourseListing: CourseTableColumn[] = [];
  const courseCodes = new Set<number>();

  for (const columns of courseListings) {
    for (const column of columns) {
      if (!courseCodes.has(column.courseCode)) {
        courseCodes.add(column.courseCode);
        mergedCourseListing.push(column);
      }
    }
  }

  return mergedCourseListing;
}

/**
 * Fetches all course sections
 *
 * @return - All course sections
 */
export async function fetchCourseSections(): Promise<any[]> {
  const webReg: any[] = await fetchAllWebRegListings();
  const courseSections: any[] = [];
  const professorNameIdMap: Map<string, number> =
    await createProfessorNameIdMap();

  webReg.forEach(
    ({
      courseCode,
      year,
      term,
      sections,
    }: {
      courseCode: string;
      year: number;
      term: Term;
      sections: CourseSection[];
    }) => {
      sections.forEach(async (section: any) => {
        const [professorLastName, professorFirstName] = section.professorName[0]
          ?.name
          ? parseProfessorName(section.professorName[0].name)
          : [null, null];

        if (professorLastName) {
          const professorId = professorNameIdMap.get(
            `${professorLastName}, ${professorFirstName}`,
          );

          if (!professorId) {
            console.error(
              `Failed to find professor ${professorFirstName} ${professorLastName}`,
            );
          } else {
            const sectionNumber = section.sectionNumber;

            courseSections.push({
              sectionNumber,
              courseCode,
              professorId,
              term,
              year,
            });
          }
        }
      });
    },
  );

  return courseSections;
}

/**
 * Parses the webreq preq notes
 *
 * @param preqreqNotes - Prereq notes string returned from webreg api
 * @return - List of prereq course code strings
 */
export function parsePrereqNotes(prereqNotes: string): string[] {
  const normalizedString = prereqNotes
    .toLowerCase()
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .replace(/[()]/g, "")
    .replace(/\s/g, "")
    .trim()
    .replace(
      "anycourseequalorgreaterthan:",
      "Any course equal x_x greater than ",
    );

  const prereqs: string[] = normalizedString.split("or");

  const prereqsSplit: string[][] = [];
  prereqs.forEach((s: string) => {
    prereqsSplit.push(s.split("and"));
  });

  const prereqsJoined: string[] = [];
  prereqsSplit.forEach((s: string[]) => {
    prereqsJoined.push(
      s.join(" and ").replace("or", " or ").replace("x_x", "or"),
    );
  });

  return prereqsJoined;
}
