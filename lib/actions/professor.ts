"use server";

import { getCoursesTaughtByProfessor } from "../data/course";
import { getProfessorPageRatings } from "../data/professor";

export async function getCoursesByProfessor(professorId: number) {
  return await getCoursesTaughtByProfessor(professorId);
}

export async function getProfessorMetrics(professor: any) {
  return await getProfessorPageRatings(professor);
}
