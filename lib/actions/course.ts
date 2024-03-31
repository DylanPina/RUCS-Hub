"use server";

import { queryProfessorsByCourse } from "../data/professor";

export default async function getProfessorsByCourse(courseCode: number) {
  return await queryProfessorsByCourse(courseCode);
}
