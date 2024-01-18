import { Term } from "@/lib/definitions/course";
import { MAX_YEAR, MIN_YEAR } from "@/lib/constants";

/**
 * Validates the supported term and year range for a course.
 *
 * @param year - Year the course is/was offered
 * @param term - Term it is/was offered
 * @return - Will return an error if range check is violated.
 */
export function validateCourseTermYear(
  year: number,
  term: Term | null,
): boolean {
  if (
    year > MAX_YEAR ||
    year < MIN_YEAR ||
    (year === MAX_YEAR && term !== Term.Spring)
  ) {
    return false;
  }

  return true;
}

/**
 * @return - List of all available terms
 */
export function getTerms(): Term[] {
  return [Term.Winter, Term.Spring, Term.Summer, Term.Fall];
}

/**
 * @return - List of all available years
 */
export function getYears(): number[] {
  const years: number[] = [];
  for (let year = MIN_YEAR; year <= MAX_YEAR; year++) {
    years.push(year);
  }
  return years;
}

/**
 * Retrieves Term enum with the given value.
 *
 * @param value - The numeric value of the Term enum to find the enum for.
 * @return - The Term enum that matches the given value, or null if no match is found.
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
 * @return - The Term enum that matches the given name, or null if no match is found.
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

/**
 * Returns a list of valid years for a given term
 *
 * @param term - The term which we want to find valid years for, or null for any term
 * @return - List of valid years for a given term
 */
export function getValidYears(term: Term | null): number[] {
  const years: number[] = [];
  for (let year = MIN_YEAR; year <= MAX_YEAR; year++) {
    if (
      (term !== null && validateCourseTermYear(year, term)) ||
      term === null
    ) {
      console.log(`Year: ${year}, Term: ${term}`);
      years.push(year);
    }
  }
  return years;
}

/**
 * Returns a list of valid terms for a given year
 *
 * @param year - The year which we want to find valid years for, or null for any year
 * @return - List of valid terms for a given year
 */
export function getValidTerms(year: number | null): string[] {
  const terms: any[] = Object.values(Term).filter((value) =>
    isNaN(Number(value)),
  );

  const validTerms: string[] = [];
  terms.forEach((term: string) => {
    if (
      (year !== null && validateCourseTermYear(year, getTermByName(term))) ||
      year === null
    ) {
      validTerms.push(term);
    }
  });
  return validTerms;
}
