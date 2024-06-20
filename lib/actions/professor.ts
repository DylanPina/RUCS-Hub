"use server";

import { queryCoursesTaughtByProfessor } from "../data/course";
import { getProfessorPageRatings } from "../data/professor";

export async function getCoursesByProfessor(professorId: number) {
  return await queryCoursesTaughtByProfessor(professorId);
}

export async function getProfessorMetrics(professor: any) {
  return await getProfessorPageRatings(professor);
}
