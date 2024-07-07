"use server";

import { Course } from "@prisma/client";
import { getProfessorByCourse } from "@/lib/data/professor";
import { getCoursesBySubjectCode } from "@/lib/data/course";

/**
 * Get professors by course
 *
 * @param courseId - Course ID
 * @return - List of professors
 */
export default async function getProfessorsByCourse(code: number) {
  return await getProfessorByCourse(code);
}

/**
 * Get courses by subject code
 *
 * @param subjectCode - Subject code of the courses we are trying to fetch
 * @return - List of courses for the subject
 */
export async function getCoursesBySubjectCodeAction(
  subjectCode: string,
): Promise<Course[]> {
  return await getCoursesBySubjectCode(subjectCode);
}
