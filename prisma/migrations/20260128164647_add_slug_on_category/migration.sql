/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `category` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `category` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "category" DROP COLUMN "imageUrl",
ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "role" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "category_slug_key" ON "category"("slug");
