/*
  Warnings:

  - You are about to drop the column `name` on the `Professor` table. All the data in the column will be lost.
  - Added the required column `firstName` to the `Professor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Professor` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Professor_name_key";

-- AlterTable
ALTER TABLE "Professor" DROP COLUMN "name",
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL;
