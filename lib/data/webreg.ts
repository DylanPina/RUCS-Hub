import { WEBREG_BASE_URL } from "../constants";
import {
  CourseSection,
  CourseWebRegListing,
  Term,
} from "../definitions/course";
import {
  formatProfessorName,
  getValidYearTermMap,
  parseProfessorName,
  validateWebRegCourseTermYear,
} from "../utils";
import { parsePrereqNotes } from "./course";
import { RUTGERS_SUBJECTS_URL } from "../constants";
import { titleCase } from "../utils";

/**
 * Get all listings
 *
 * @return - List of course names and open sections
 */
export async function getAllCourseListingWebReg(): Promise<
  Map<string, CourseWebRegListing[]>
> {
  const subjects = await getSubjectsWebReg();
  const courseListings: Promise<CourseWebRegListing[]>[] = [];

  subjects.forEach(({ code }: { code: string }) =>
    courseListings.push(getCourseListingBySubjectWebReg(code)),
  );

  const listings = await Promise.all(courseListings);
  const mergedCourseListingMap = mergeCourseListingBySubjectCode(
    listings.flat(),
  );
  return mergedCourseListingMap;
}

/**
 * Get all listings for all courses by subject
 *
 * @param subjectCode - The subject code we are interested in
 * @return - A list of all the documented courses
 */
async function getCourseListingBySubjectWebReg(
  subjectCode: string,
): Promise<CourseWebRegListing[]> {
  const validYearTermMap: Map<number, Term[]> = getValidYearTermMap();
  const courseListingsPromises: Promise<CourseWebRegListing[]>[] = [];

  for (const [year, terms] of Array.from(validYearTermMap.entries())) {
    for (const term of terms) {
      const courseListingPromise = getCourseListingByYearTermWebReg(
        subjectCode,
        year,
        term,
      ).catch((error) => {
        console.error(
          `Error fetching courses for subject:[${subjectCode}] year:[${year}] term:[${term}]`,
          error,
        );
        return [];
      });
      courseListingsPromises.push(courseListingPromise);
    }
  }

  const courseListings = await Promise.all(courseListingsPromises);
  return courseListings.flat();
}

/**
 * Get all course sections
 *
 * @return - All course sections
 */
export async function getAllCourseSectionsWebReg(): Promise<CourseSection[]> {
  const courseListings: Map<string, CourseWebRegListing[]> =
    await getAllCourseListingWebReg();
  const courseSections: any[] = [];

  courseListings.forEach((listings, _) => {
    listings.forEach(({ code, year, term, sections }) => {
      sections.forEach(async (section: any) => {
        const [professorLastName, professorFirstName] = section.professorName[0]
          ?.name
          ? parseProfessorName(section.professorName[0].name)
          : [null, null];

        if (!professorLastName) {
          return;
        }

        courseSections.push({
          sectionNumber: section.sectionNumber,
          code,
          professorName: formatProfessorName(
            professorLastName || "",
            professorFirstName,
          ),
          term,
          year,
        });
      });
    });
  });

  return courseSections;
}

/**
 * Parses the API request from webreg listing all of the CS courses for a given year and term
 *
 * @param subjectCode - The subject code we are interested in
 * @param year - Year the course is/was offered (2022 - 2024)
 * @param term - Term it is/was offered
 * @return - List of course webreg listings
 */
export async function getCourseListingByYearTermWebReg(
  subjectCode: string,
  year: number,
  term: Term,
): Promise<CourseWebRegListing[]> {
  if (!validateWebRegCourseTermYear(year, term)) {
    throw new Error(`Failed to parse WebReg courses for ${year} ${term}`);
  }

  const webRegUrl = `${WEBREG_BASE_URL}?subject=${subjectCode}&semester=${term.valueOf()}${year}&campus=NB&level=UG`;
  const res = await fetch(webRegUrl);
  if (!res.ok) {
    throw new Error(`Failed to fetch courses from ${webRegUrl}`);
  }

  const courseListingJson = await res.json();
  if (!courseListingJson) {
    throw new Error(`Failed to parse courses json from ${webRegUrl}`);
  }

  return courseListingJson.map((courseListing: any) => {
    return {
      subjectCode: subjectCode,
      code: Number(courseListing.courseNumber),
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
}

/**
 * Get all the names of professors for the CS department
 *
 * @return - List of tuples which contain [lastName, firstName]
 */
export async function getProfessorNamesWebReg(): Promise<string[]> {
  const sections: CourseSection[] = await getAllCourseSectionsWebReg();
  const professorFullNames = new Set<string>();

  sections.forEach((section: any) => {
    const professorName = section.professorName;

    if (professorName) {
      professorFullNames.add(professorName);
    }
  });

  return Array.from(professorFullNames);
}

/**
 * Fetches all subjects from webreg
 *
 * @return - List of all subjects
 */
export async function getSubjectsWebReg() {
  const res = await fetch(RUTGERS_SUBJECTS_URL);

  if (!res.ok) {
    throw new Error(`Failed to fetch subjects from ${RUTGERS_SUBJECTS_URL}`);
  }

  const subjectsJson = await res.json();
  return subjectsJson.map((subject: any) => {
    return {
      code: subject.code,
      name: titleCase(subject.description),
    };
  });
}

/**
 * Merges course listings from different years and terms into one course listings based on
 * subject and course code
 *
 * @param courseListings - A list of course listings to merge together
 * @return - One combined course listing with no duplicates
 */
export function mergeCourseListingBySubjectCourseCode(
  courseListings: CourseWebRegListing[][],
) {
  const mergedCourseListings: { [key: string]: CourseWebRegListing } = {};

  courseListings.flat().forEach((courseListing: CourseWebRegListing) => {
    const key = `${courseListing.subjectCode}-${courseListing.code}`;

    if (!mergedCourseListings[key]) {
      mergedCourseListings[key] = courseListing;
    }
  });

  return Object.values(mergedCourseListings);
}

/**
 * Merges course listings from different years and terms into one course listings
 * based on course code
 *
 * @param courseListing - A list of course listings to merge together
 * @return - One combined course listing with no duplicates
 */
export function mergeCourseListingByCourseCode(
  courseListing: CourseWebRegListing[][],
): CourseWebRegListing[] {
  const mergedCourseListing: CourseWebRegListing[] = [];
  const codes = new Set<number>();

  for (const columns of courseListing) {
    for (const column of columns) {
      if (!codes.has(column.code)) {
        codes.add(column.code);
        mergedCourseListing.push(column);
      }
    }
  }

  return mergedCourseListing;
}

/**
 * Merges course listings from different years and terms into a hashmap
 * based on subject code
 *
 * @param courseListings - A list of course listings to merge together
 * @return - A hashmap where the key is the subject code and the values are the merged course listings for each subject
 */
export function mergeCourseListingBySubjectCode(
  courseListings: CourseWebRegListing[],
): Map<string, CourseWebRegListing[]> {
  const mergedCourseListingMap = new Map<string, CourseWebRegListing[]>();

  courseListings.forEach((courseListing) => {
    if (!mergedCourseListingMap.has(courseListing.subjectCode)) {
      mergedCourseListingMap.set(courseListing.subjectCode, []);
    }
    mergedCourseListingMap.get(courseListing.subjectCode)!.push(courseListing);
  });

  return mergedCourseListingMap;
}
