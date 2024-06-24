"use server";

import { getProfessorByCourse } from "../data/professor";

export default async function getProfessorsByCourse(code: number) {
  return await getProfessorByCourse(code);
}
