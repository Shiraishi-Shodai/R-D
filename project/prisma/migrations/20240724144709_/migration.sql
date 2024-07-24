/*
  Warnings:

  - You are about to drop the column `emailverified` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "emailverified",
ADD COLUMN     "emailVerified" TIMESTAMP(6);
