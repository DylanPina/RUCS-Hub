"use server";

import { getSubjectByCode } from "@/lib/data/subject";

/**
 * Get all subjects
 *
 * @param subjectCode - Subject code of the courses we are trying to fetch
 * @return - List of all subjects
 */
export async function getSubjectByCodeAction(subjectCode: string) {
  return await getSubjectByCode(subjectCode);
}
