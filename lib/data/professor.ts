import { Term } from "../definitions/course";
import { ProfessorTableColumn } from "../definitions/professor";
import { getValidYearTermMap } from "../utils";
import { parseWebRegListingByYearTerm } from "./course";
import { titleCase } from "../utils";

/**
 * Fetches professor table data
 *
 * @return - Professor table data
 */
export async function fetchProfessorTableData(): Promise<
  ProfessorTableColumn[]
> {
  const professorNames: [string, string][] = await fetchProfessorNames();

  return professorNames.map(([lastName, firstName]: [string, string]) => {
    return {
      firstName: titleCase(firstName),
      lastName: titleCase(lastName),
      overall: 0,
      difficulty: 0,
      totalReviews: 0,
    };
  });
}

/**
 * Fetches all the names of professors for the CS department
 *
 * @return - List of tuples which contain [lastName, firstName]
 */
export async function fetchProfessorNames(): Promise<[string, string][]> {
  const validYearTermMap: Map<number, Term[]> = getValidYearTermMap();

  const sections: Promise<any[]>[] = [];
  validYearTermMap.forEach((terms, year) => {
    terms.forEach((term) => {
      sections.push(parseWebRegListingByYearTerm(year, term));
    });
  });

  const listings = (await Promise.all(sections)).flat();

  const professorFullNames = new Set<string>();
  listings
    .flatMap((listing) => listing.sections)
    .forEach((section) => {
      if (section.professorName[0]?.name) {
        professorFullNames.add(section.professorName[0].name);
      }
    });

  return Array.from(professorFullNames).map((professor) => {
    const parts = professor.split(",").map((part) => part.trim());

    if (parts.length > 1) {
      return [parts[0], parts[1]];
    }

    return [parts[0], ""];
  });
}
