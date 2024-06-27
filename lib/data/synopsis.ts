import { CS_COURSE_SYNOPSIS_URL, RUTGERS_CS_URL } from "../constants";
import { CourseSynopsisListing } from "../definitions/course";
import { JSDOM } from "jsdom";

/**
 * Parses the HTML for the course synposes listing to return a list of course names and their IDs
 *
 * @param courseSynopsisHtml - HTML for the course synposes website
 * @return - An array of course synposes listings
 */
export async function getCourseSynopsisListing(): Promise<CourseSynopsisListing[]> {
  try {
    const res = await fetch(CS_COURSE_SYNOPSIS_URL);

    if (!res.ok) {
      throw new Error(
        `Error fetching synposes listing from ${CS_COURSE_SYNOPSIS_URL}`,
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

      const [code, name] = parseCourseCodeName(courseString);
      courses.push({ code, name, synopsisUrl });
    });

    return courses;
  } catch (error) {
    console.error(
      `Error parsing synposes listing from ${CS_COURSE_SYNOPSIS_URL}: ${error}`,
    );
    return [];
  }
}

/**
 * Get the synposes listing for a particular course given the courses ID
 *
 * @param courseId - Course ID for the course we are interested in
 * @return - Synopsis listing for that course
 */
export async function getCourseSynopsisListingById(
  courseId: number,
): Promise<CourseSynopsisListing> {
  const courseSynopsisListings: CourseSynopsisListing[] =
    await getCourseSynopsisListing();

  const courseSynopsisListing: CourseSynopsisListing =
    courseSynopsisListings.filter(
      (listing: CourseSynopsisListing) => listing.code == courseId,
    )[0];

  return courseSynopsisListing;
}

/**
 * Parses a string containing the full course code and course name
 * (ex: "01:198:103 - Introduction to Computer Skills")
 *
 * @param courseSynopsisString - String rerepesnting the listing on course synposes list
 * @return - Parsed course ID and course title (ex [103, "Introduction to Computer Skills"])
 */
function parseCourseCodeName(codeName: string): [number, string] {
  const normalizedString = codeName.replace(/-/g, " - ");

  let parts = normalizedString.split(/\s-\s/);

  if (parts.length === 1) {
    parts = normalizedString.split(" ");
  }

  const idPart = parts.shift();
  const match = idPart ? idPart.match(/\d{3}(?=\D*$)/) : null;
  const code = match ? parseInt(match[0]) : -1;
  const name = parts.join(" ").trim();

  return [code, name];
}
