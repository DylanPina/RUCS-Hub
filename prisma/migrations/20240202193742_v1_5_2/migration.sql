/*
  Warnings:

  - The primary key for the `Section` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `semester` on the `Section` table. All the data in the column will be lost.
  - Added the required column `term` to the `Section` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Section" DROP CONSTRAINT "Section_pkey",
DROP COLUMN "semester",
ADD COLUMN     "term" INTEGER NOT NULL,
ADD CONSTRAINT "Section_pkey" PRIMARY KEY ("sectionNumber", "code", "term", "year");
