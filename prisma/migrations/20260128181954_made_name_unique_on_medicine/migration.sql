/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `medicine` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "medicine_name_key" ON "medicine"("name");
