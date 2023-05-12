/*
  Warnings:

  - You are about to drop the column `date` on the `Pub` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Pub" DROP COLUMN "date",
ALTER COLUMN "overall_drink_rating" DROP NOT NULL,
ALTER COLUMN "overall_food_rating" DROP NOT NULL,
ALTER COLUMN "overall_rating" DROP NOT NULL;
