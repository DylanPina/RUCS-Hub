"use server";

import { queryProfessorsByCourse } from "../data/professor";

export default async function getProfessorsByCourse(code: number) {
  return await queryProfessorsByCourse(code);
}
