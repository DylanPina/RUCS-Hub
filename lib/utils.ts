import { Term } from "@/lib/definitions/course";
import { MAX_YEAR, MIN_YEAR } from "@/lib/constants";

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

/**
 * Retrieves Tern enum with the given value.
 *
 * @param value - The numeric value of the Term enum to find the enum for.
 * @returns - The Term enum that matches the given value, or null if no match is found.
 */
export function getTermByValue(value: number): Term | null {
  switch (value) {
    case 0:
      return Term.Winter;
    case 1:
      return Term.Spring;
    case 7:
      return Term.Summer;
    case 9:
      return Term.Fall;
    default:
      return null;
  }
}

/**
 * Retrieves Term enum with the given key name.
 *
 * @param term - The string value of the Term enum to find the enum for.
 * @returns - The Term enum that matches the given name, or null if no match is found.
 */
export function getTermByName(name: string): Term | null {
  switch (name.toLowerCase()) {
    case "winter":
      return Term.Winter;
    case "spring":
      return Term.Spring;
    case "summer":
      return Term.Summer;
    case "fall":
      return Term.Fall;
    default:
      return null;
  }
}
