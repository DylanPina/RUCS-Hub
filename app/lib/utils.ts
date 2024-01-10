import { Term } from "@/app/lib/definitions/course";
import { MAX_YEAR, MIN_YEAR } from "@/app/lib/constants";

/**
 * Validates the supported term and year range for a course.
 *
 * @param year - Year the course is/was offered
 * @param term - Term it is/was offered
 * @return - Will return an error if range check is violated.
 */
export function validateCourseTermYear(year: number, term: Term): void {
  if (year > MAX_YEAR || year < MIN_YEAR) {
    throw new Error(
      `Year ${year} is out of supported range (${MIN_YEAR} - ${MAX_YEAR}).`,
    );
  }

  if (year === MAX_YEAR && term !== Term.Spring) {
    throw new Error(`${year} ${term} term is not supported.`);
  }
}
