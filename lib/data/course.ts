import {
  CourseSynopsesListing,
  Term,
  CourseWebRegListing,
  CourseTableEntry,
} from "@/lib/definitions/course";
import { validateCourseTermYear } from "@/lib/utils";
import {
  COURSE_SYNOPSES_URL,
  RUTGERS_CS_URL,
  WEBREG_BASE_URL,
} from "@/lib/constants";
import { JSDOM } from "jsdom";
import { writeFileSync } from "fs";

/**
 * Fetches all courses from Rutgers CS webreg listing for a given semester.
 *
 * @param year - Year the course is/was offered (2022 - 2024)
 * @param term - Term it is/was offered
 * @return - List of courses offered for that specific year and term
 */
export async function fetchCourseTableListings(year: number, term: Term) {
  const courseSynposesListing = await parseSynposesListing();
  const courseWebRegListing = await parseWebRegListing(year, term);

  writeFileSync(
    "logs/course_synposes_listing.log",
    JSON.stringify(courseSynposesListing, null, 2),
  );
  writeFileSync(
    "logs/course_webreg_listing.log",
    JSON.stringify(courseWebRegListing, null, 2),
  );

  return combineCourseListings(courseSynposesListing, courseWebRegListing);
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
): CourseTableEntry[] {
  return courseSynposesListing.map((synopsis: CourseSynopsesListing) => {
    const webReg = courseWebRegListing.find(
      (x: CourseWebRegListing) => x.courseCode == synopsis.courseCode,
    );

    return {
      courseCode: synopsis.courseCode,
      courseName: synopsis.courseName,
      credits: webReg ? webReg.credits : -1, // Default to -1 if no matching webReg listing is found
    };
  });
}
