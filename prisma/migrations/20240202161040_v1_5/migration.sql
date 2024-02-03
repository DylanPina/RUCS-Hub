-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "credits" INTEGER,
ADD COLUMN     "synopsis" TEXT;

-- CreateTable
CREATE TABLE "Section" (
    "sectionNumber" TEXT NOT NULL,
    "courseCode" INTEGER NOT NULL,
    "professorId" INTEGER NOT NULL,
    "semester" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,

    CONSTRAINT "Section_pkey" PRIMARY KEY ("sectionNumber","courseCode","semester","year")
);

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_courseCode_fkey" FOREIGN KEY ("courseCode") REFERENCES "Course"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
