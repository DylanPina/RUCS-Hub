"use server";

import { queryCoursesTaughtByProfessor } from "../data/course";

export default async function getCoursesByProfessor(professorId: number) {
  return await queryCoursesTaughtByProfessor(professorId);
}
