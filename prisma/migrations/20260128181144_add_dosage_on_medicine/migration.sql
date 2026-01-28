/*
  Warnings:

  - Added the required column `dosage` to the `medicine` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "medicine" ADD COLUMN     "dosage" TEXT NOT NULL;
