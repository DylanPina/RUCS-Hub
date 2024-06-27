import { WEBREG_BASE_URL } from "../constants";
import { CourseSection, CourseSynopsisListing, CourseTableColumn, CourseWebRegListing, Term } from "../definitions/course";
import { formatProfessorName, getTerms, getValidYearTermMap, getYears, parseProfessorName, validateCourseTermYear } from "../utils";
import { parsePrereqNotes } from "./course";
import { createProfessorNameIdMap } from "./professor";
import { getCourseSynopsisListing } from "./synopsis";

/**
 * Get courses from Rutgers CS webreg listing for a given year
 *
 * @param year - The year we are interested in
 * @return - A list of all the documented courses from that year
 */
async function getCourseTableListingByYearWebReg(
  year: number,
): Promise<CourseTableColumn[]> {
  const terms: Term[] = getTerms();
  const courseTableListings: Promise<CourseTableColumn[]>[] = [];

  terms.forEach((term: Term) => {
    const courseTableListing = getCourseTableListingsByYearTermWebReg(
      year,
      term,
    );
    courseTableListings.push(courseTableListing);
  });

  return mergeCourseListings(await Promise.all(courseTableListings));
}

/**
 * Get courses from Rutgers CS webreg listing for a given term
 *
 * @param term - The term we are interested in
 * @return - A list of all the documented courses from that term
 */
async function getCourseTableListingByTermWebReg(
  term: Term,
): Promise<CourseTableColumn[]> {
  const years: number[] = getYears();
  const courseTableListings: Promise<CourseTableColumn[]>[] = [];

  years.forEach((year: number) => {
    const courseTableListing = getCourseTableListingsByYearTermWebReg(
      year,
      term,
    );
    courseTableListings.push(courseTableListing);
  });

  return mergeCourseListings(await Promise.all(courseTableListings));
}

/**
 * Get course table data based on the given year and term
 *
 * @param year - Year the courses were offered (or null or all)
 * @param term - Term the courses were offered (or null or all)
 * @return - Course table data for the courses based on year and term
 */
export async function getCourseTableData(
  year: number | null,
  term: Term | null,
): Promise<CourseTableColumn[]> {
  if (year !== null && term !== null) {
    return await getCourseTableListingsByYearTermWebReg(year, term);
  } else if (term !== null && year === null) {
    return await getCourseTableListingByTermWebReg(term);
  } else if (term === null && year !== null) {
    return await getCourseTableListingByYearWebReg(year);
  } else {
    return await getAllCourseTableListingsWebReg();
  }
}


/**
 * Get all courses from Rutgers CS webreg listing for all documented years and semesters.
 *
 * @return - A list of all the documented courses from documented years and semesters.
 */
export async function getAllCourseTableListingsWebReg(): Promise<
  CourseTableColumn[]
> {
  const validYearTermMap: Map<number, Term[]> = getValidYearTermMap();

  const courseTableListings: Promise<CourseTableColumn[]>[] = [];
  validYearTermMap.forEach((terms: Term[], year: number) => {
    terms.forEach((term: Term) => {
      const courseTableListing = getCourseTableListingsByYearTermWebReg(
        year,
        term,
      );
      courseTableListings.push(courseTableListing);
    });
  });

  return mergeCourseListings(await Promise.all(courseTableListings));
}

/**
 * Get all courses from Rutgers CS webreg listing for a given year and semester.
 *
 * @param year - Year the course is/was offered (2022 - 2024)
 * @param term - Term it is/was offered
 * @return - List of courses offered for that specific year and term
 */
async function getCourseTableListingsByYearTermWebReg(
  year: number,
  term: Term,
): Promise<CourseTableColumn[]> {
  const courseSynopsisListing = await getCourseSynopsisListing();
  const courseWebRegListing = await getListingByYearTermWebReg(year, term);
  const combinedCourseListings = combineCourseListings(
    courseSynopsisListing,
    courseWebRegListing,
  );

  return combinedCourseListings;
}




/**
 * Get WebReg listings for a particular course for all years and terms
 *
 * @return - List of course names and open sections
 */
export async function getAllListingsWebReg(): Promise<CourseWebRegListing[]> {
  const validYearTermMap: Map<number, Term[]> = getValidYearTermMap();

  const courseWebRegListings: Promise<CourseWebRegListing[]>[] = Array.from(
    validYearTermMap,
  ).flatMap(([year, terms]: [number, Term[]]) => {
    return terms.map((term: Term) => getListingByYearTermWebReg(year, term));
  });

  const listings = await Promise.all(courseWebRegListings);
  return listings.flat();
}

/**
 * Get all course sections
 *
 * @return - All course sections
 */
export async function getCourseSectionsWebReg(): Promise<any[]> {
  const webReg: any[] = await getAllListingsWebReg();
  const courseSections: any[] = [];
  const professorNameIdMap: Map<string, number> =
    await createProfessorNameIdMap();

  webReg.forEach(
    ({
      code,
      year,
      term,
      sections,
    }: {
      code: string;
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
            formatProfessorName(professorLastName, professorFirstName),
          );

          if (!professorId) {
            console.error(
              `Failed to find professor ${professorFirstName} ${professorLastName}`,
            );
          } else {
            const sectionNumber = section.sectionNumber;

            courseSections.push({
              sectionNumber,
              code,
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
 * Parses the API request from webreg listing all of the CS courses for a given year and term
 *
 * @param year - Year the course is/was offered (2022 - 2024)
 * @param term - Term it is/was offered
 * @return - List of course webreg listings
 */
export async function getListingByYearTermWebReg(
  year: number,
  term: Term,
): Promise<CourseWebRegListing[]> {
  if (!validateCourseTermYear(year, term)) {
    throw new Error(`Failed to parse WebReg courses for ${year} ${term}`);
  }

  const endpoint = `${WEBREG_BASE_URL}&semester=${term.valueOf()}${year}&campus=NB&level=UG`;
  try {
    const res = await fetch(endpoint);
    const courseListingJson = await res.json();

    return courseListingJson.map((courseListing: any) => {
      return {
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
  } catch (error) {
    console.error(
      `Failed to fetch webreg listing from ${endpoint}`,
    );
    return [];
  }
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
  const codes = new Set<number>();

  for (const columns of courseListings) {
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
 * Combines data from course listings from synpopses and webreg
 *
 * @param courseSynopsisListing - Course listings from synposes RUCS website
 * @param courseWebRegListing - Course listings from RUCS WebReg
 * @return - An array of course table entries based on these two listings
 */
function combineCourseListings(
  courseSynopsisListing: CourseSynopsisListing[],
  courseWebRegListing: CourseWebRegListing[],
): CourseTableColumn[] {
  return courseWebRegListing.map((webReg: CourseWebRegListing) => {
    const synposes = courseSynopsisListing.find(
      (x: CourseSynopsisListing) => x.code == webReg.code,
    );

    return {
      code: webReg.code,
      name: synposes?.name || webReg.title,
      credits: webReg.credits,
      synopsisUrl: synposes?.synopsisUrl || "",
      prereqs: webReg.prereqs,
    };
  });
}

