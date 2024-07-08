import { Term } from "@/lib/definitions/course";
import {
  MAX_YEAR,
  MIN_YEAR,
  WEBREG_MAX_YEAR,
  WEBREG_MIN_YEAR,
} from "@/lib/constants";
import sha256 from "crypto-js/sha256";
import { NextRouter } from "next/router";
import { titleCase as _titleCase } from "title-case";
import { Course, Subject } from "@prisma/client";

/**
 * Validates the supported term and year range for a course.
 *
 * @param year - Year the course is/was offered
 * @param term - Term it is/was offered
 * @return - Will return an error if range check is violated.
 */
export function validateWebRegCourseTermYear(
  year: number,
  term: Term | null,
): boolean {
  if (
    year > WEBREG_MAX_YEAR ||
    year < WEBREG_MIN_YEAR ||
    (year === WEBREG_MAX_YEAR && term === Term.Winter) ||
    (year === WEBREG_MIN_YEAR && term !== Term.Winter)
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
  for (let year = WEBREG_MAX_YEAR; year >= WEBREG_MIN_YEAR; year--) {
    years.push(year);
  }
  return years;
}

/**
 * @return - Map containing all valid year and term matchings
 */
export function getValidYearTermMap(): Map<number, Term[]> {
  const years: number[] = getYears();
  const terms: Term[] = getTerms();
  const validYearTermMap: Map<number, Term[]> = new Map<number, Term[]>();

  years.forEach((year: number) => {
    const validTerms: Term[] = [];

    terms.forEach((term: Term) => {
      if (validateWebRegCourseTermYear(year, term)) {
        validTerms.push(term);
      }
    });

    validYearTermMap.set(year, validTerms);
  });

  return validYearTermMap;
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
 * Retrieves Term name with the given value.
 *
 * @param value - The numeric value of the Term enum to find the enum for.
 * @return - The Term name that matches the given value, or null if no match is found.
 *
 */
export function getTermNameByValue(value: number): string | null {
  switch (value) {
    case 0:
      return "Winter";
    case 1:
      return "Spring";
    case 7:
      return "Summer";
    case 9:
      return "Fall";
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
      (term !== null && validateWebRegCourseTermYear(year, term)) ||
      term === null
    ) {
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
      (year && validateWebRegCourseTermYear(year, getTermByName(term))) ||
      !year
    ) {
      validTerms.push(term);
    }
  });
  return validTerms;
}

/**
 * Converts a string to title case.
 *
 * @param input - The string to be converted to title case.
 * @returns - The input string transformed into title case.
 */
export function titleCase(input: string): string {
  return _titleCase(input.toLowerCase());
}

/**
 * Converts a kebab cased string to title case
 *
 * @param input - Kebab cased string
 * @returns - Title cased string
 */
export function kebabCaseToTitleCase(input: string): string {
  if (input.includes("-")) {
    return input
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  } else {
    // Input is a single lowercase word
    return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
  }
}

/**
 * Generates the route to the professor's page
 *
 * @param lastName - Last name of the professor
 * @param firstName - First name of the professor (or null if it isn't listed)
 *
 * @return - Route to the professor's page
 */
export function getProfessorRoute(
  lastName: string,
  firstName: string | null,
): string {
  return firstName
    ? `/professor/${firstName.toLowerCase()}-${lastName.toLowerCase()}`
    : `/professor/${lastName.toLowerCase()}`;
}

/**
 * Generates the route to the course's page
 *
 * @param code - Course code
 * @return - Route to the course's page
 */
export function getCourseRoute(
  subjectCode: string,
  courseCourse: number,
): string {
  return `/course/${subjectCode}:${courseCourse}`;
}

/**
 * Parses the professor's name into last name and first name
 *
 * @param name - Full name of the professor
 * @return - Tuple containing the last name and first name of the professor
 */
export function parseProfessorName(name: string): [string, string | null] {
  const names: string[] = name.toUpperCase().replace(",", "").split(" ");
  return names.length === 2 ? [names[0], names[1]] : [names[0], null];
}

/**
 * Format professor name
 *
 * @param lastName - Last name of the professor
 * @param firstName - First name of the professor
 * @return - Last name and first name of the professor
 */
export function formatProfessorName(
  lastName: string,
  firstName?: string | null,
): string {
  return firstName
    ? `${titleCase(firstName)} ${titleCase(lastName ?? "")}`
    : titleCase(lastName ?? "");
}

/**
 * Formats a review date into a readable format
 *
 * @param date - Date to be formatted
 * @return - Formatted date
 * */
export function formatReviewDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
    timeZone: "America/New_York",
    timeZoneName: "short",
  };

  const formatter = new Intl.DateTimeFormat("en-US", options);
  return formatter.format(date);
}

/**
 * Compute a hash of a string
 *
 * @param str - String to be hashed
 * @return - Hash of the string
 */
export function hashEmailAddress(email: string): string {
  return sha256(email).toString();
}

/**
 * Removes a query parameter from the URL
 *
 * @param paramKey - Key of the query parameter to remove
 */
export const removeQueryParam = (router: NextRouter, paramKey: string) => {
  // Destructure the query object to exclude the param to remove
  const { [paramKey]: _, ...rest } = router.query;

  // Push the new query to the router, without the removed param
  router.push(
    {
      pathname: router.pathname,
      query: { ...rest },
    },
    undefined,
    { shallow: true },
  );
};

export function formatCourseName(course: Course): string {
  return `${course.code} - ${course.name}`;
}

export function formatSubjectName(subject: Subject): string {
  return `${subject.code}: ${subject.name}`;
}
