import { Term } from "@/app/lib/definitions/course";
import { validateCourseTermYear } from "@/app/lib/utils";
import { COURSE_SYNOPSES_URL, RUTGERS_CS_URL } from "@/app/lib/constants";
import { JSDOM } from "jsdom";

/**
 * Fetches all courses from Rutgers CS webreg listing for a given semester.
 *
 * @param year - Year the course is/was offered (2022 - 2024)
 * @param term - Term it is/was offered
 * @return - List of courses offered for that specific year and term
 */
export async function fetchCourseListings(year: number, term: Term) {
  try {
    validateCourseTermYear(year, term);
  } catch (error) {
    console.error("Failed to fetch courses.");
    throw new Error(`Failed to fetch courses: ${error}`);
  }

  return parseSynposesListing(COURSE_SYNOPSES_URL);
}

/**
 * Parses the HTML for the course synposes listing to return a list of course names and their IDs
 *
 * @param courseSynposesHtml - HTML for the course synposes website
 * @return - List of course names and IDs
 */
export async function parseSynposesListing(url: string): Promise<any[]> {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error fetching synposes listing from ${url}`);
    }

    const html = await response.text();
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

      const [courseCode, courseName] = parseCourseSynposesString(courseString);
      courses.push({ courseCode, courseName, synopsisLink });
    });

    console.log(courses);
    return courses;
  } catch (error) {
    console.error(`Error parsing synposes listing from ${url}: ${error}`);
    return [];
  }
}

/**
 * Parses course the Rutgers CS synposes listing string (ex: "01:198:103 - Introduction to Computer Skills")
 *
 * @param courseSynposesString - String rerepesnting the listing on course synposes list
 * @return - Parsed course ID and course title (ex [103, "Introduction to Computer Skills"])
 */
function parseCourseSynposesString(courseString: string): [number, string] {
  const normalizedString = courseString.replace(/-/g, " - ");

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
