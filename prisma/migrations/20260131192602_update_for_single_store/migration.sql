/*
  Warnings:

  - The values [BANED] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `sellerId` on the `medicine` table. All the data in the column will be lost.
  - You are about to drop the column `sellerId` on the `order` table. All the data in the column will be lost.
  - Made the column `role` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Status_new" AS ENUM ('ACTIVE', 'BANNED');
ALTER TABLE "public"."user" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "user" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TYPE "Status" RENAME TO "Status_old";
ALTER TYPE "Status_new" RENAME TO "Status";
DROP TYPE "public"."Status_old";
ALTER TABLE "user" ALTER COLUMN "status" SET DEFAULT 'ACTIVE';
COMMIT;

-- DropForeignKey
ALTER TABLE "medicine" DROP CONSTRAINT "medicine_sellerId_fkey";

-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_sellerId_fkey";

-- AlterTable
ALTER TABLE "medicine" DROP COLUMN "sellerId",
ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "order" DROP COLUMN "sellerId";

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "role" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "medicine" ADD CONSTRAINT "medicine_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
