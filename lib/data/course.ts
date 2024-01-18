import {
  CourseSynopsesListing,
  Term,
  CourseWebRegListing,
  CourseTableColumn,
} from "@/lib/definitions/course";
import { getTerms, getYears, validateCourseTermYear } from "@/lib/utils";
import {
  COURSE_SYNOPSES_URL,
  RUTGERS_CS_URL,
  WEBREG_BASE_URL,
} from "@/lib/constants";
import { JSDOM } from "jsdom";
import { writeFileSync } from "fs";

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
  const years: number[] = getYears();
  const terms: Term[] = getTerms();
  const validYearTermMap: Map<number, Term[]> = new Map<number, Term[]>();

  years.forEach((year: number) => {
    const validTerms: Term[] = [];

    terms.forEach((term: Term) => {
      if (validateCourseTermYear(year, term)) {
        validTerms.push(term);
      }
    });

    validYearTermMap.set(year, validTerms);
  });

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
export async function fetchCourseTableListingsByTerm(
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
export async function fetchCourseTableListingByYear(
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
export async function fetchCourseTableListingsByYearTerm(
  year: number,
  term: Term,
): Promise<CourseTableColumn[]> {
  const courseSynposesListing = await parseSynposesListing();
  const courseWebRegListing = await parseWebRegListing(year, term);
  const combinedCourseListings = combineCourseListings(
    courseSynposesListing,
    courseWebRegListing,
  );

  writeFileSync(
    "logs/course_synposes_listing.log",
    JSON.stringify(courseSynposesListing, null, 2),
  );
  writeFileSync(
    "logs/course_webreg_listing.log",
    JSON.stringify(courseWebRegListing, null, 2),
  );
  writeFileSync(
    "logs/combinedCourseListings.log",
    JSON.stringify(combinedCourseListings, null, 2),
  );

  return combinedCourseListings;
}

/**
 * Parses the API request from webreg listing all of the CS courses for a given year and term
 *
 * @param url - API endpoint for term webreg with specified year and term as query params
 * @return - List of course names and open sections
 */
export async function parseWebRegListing(
  year: number,
  term: Term,
): Promise<CourseWebRegListing[]> {
  try {
    validateCourseTermYear(year, term);
  } catch (error) {
    throw new Error(`Failed to parse WebReg courses - ${error}`);
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
        openSections: courseListing.openSections,
        sections: courseListing.sections.map((section: any) => ({
          sectionNumber: section.number,
          professorName: section.instructors,
          index: section.index,
          open: section.openStatus,
          meetingTimes: section.meetingTimes,
        })),
        prereqs: courseListing.preReqNotes,
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
 * Parses the HTML for the course synposes listing to return a list of course names and their IDs
 *
 * @param courseSynposesHtml - HTML for the course synposes website
 * @return - An array of course synposes listings
 */
export async function parseSynposesListing(): Promise<CourseSynopsesListing[]> {
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
      const synopsisLink = `${RUTGERS_CS_URL}${
        element.getAttribute("href") || ""
      }`;

      const [courseCode, courseName] = parseCourseCodeNameString(courseString);
      courses.push({ courseCode, courseName, synopsisLink });
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
  console.log(courseListings);
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
