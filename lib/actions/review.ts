"use server";

import { PrismaClient } from "@prisma/client";
import { ReviewForm } from "../definitions/review";

export default async function createReview(
  reviewForm: ReviewForm,
  userId: string,
) {
  const prisma = new PrismaClient();

  let professorFirstName, professorLastName;
  const professorNameSplit = reviewForm.professor.split(" ");

  if (professorNameSplit.length === 1) {
    professorLastName = professorNameSplit[0];
  } else {
    professorFirstName = professorNameSplit[0];
    professorLastName = professorNameSplit[1];
  }

  const professor = await prisma.professor.findFirst({
    where: {
      firstName: professorFirstName?.toUpperCase(),
      lastName: professorLastName.toUpperCase(),
    },
  });

  const professorId = professor?.id;

  await prisma.review.create({
    data: {
      userId,
      courseCode: Number(reviewForm.course.split("(")[1].split(")")[0]),
      professorId: professorId,
      year: Number(reviewForm.year),
      semester: Number(reviewForm.term),
      title: reviewForm.title,
      content: reviewForm.content,
      rating: Number(reviewForm.courseRating),
      difficultyRating: Number(reviewForm.courseDifficultyRating),
      workload: Number(reviewForm.courseWorkload),
      professorQualityRating: Number(reviewForm.professorRating),
      professorDifficultyRating: Number(reviewForm.professorDifficultyRating),
      lectureRating: Number(reviewForm.lectureRating),
    },
  });
}