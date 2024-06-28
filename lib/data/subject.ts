import { RUTGERS_SUBJECTS_URL } from "../constants";
import { titleCase } from "../utils";

/**
 * Fetches all subjects from webreg
 *
 * @return - List of all subjects
 */
export async function getSubjects() {
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
