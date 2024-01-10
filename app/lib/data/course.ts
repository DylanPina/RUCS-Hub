import { Course, Term } from "@/app/lib/definitions/course";
import { validateCourseTermYear } from "@/app/lib/utils";
import { WEBREG_BASE_URL } from "@/app/lib/constants";

/**
 * Fetches all courses from Rutgers CS webreg listing for a given semester.
 *
 * @param year - Year the course is/was offered (2022 - 2024)
 * @param term - Term it is/was offered
 * @returns - List of courses offered for that specific year and term
 */
export async function fetchCourses(year: number, term: Term) {
  try {
    validateCourseTermYear(year, term);
  } catch (error) {
    console.error("Failed to fetch courses.");
    throw new Error(`Failed to fetch courses: ${error}`);
  }

  const endpoint = `${WEBREG_BASE_URL}&semester=${term.valueOf()}${year}&campus=NB&level=UG`;
  const res = await fetch(endpoint);

  if (!res.ok) {
    throw new Error(`Failed to fetch courses data from: ${endpoint}`);
  }

  return res.json();
}

/**
 * Parses the raw JSON data for the courses fetched from the webreg API into an array of Course objects
 *
 * @param courseJson - Raw course JSON data
 * @returns - List of Course objects
 */
function parseRawCourseJson(courseJson: JSON): Course[] {}
