/*
  Warnings:

  - You are about to drop the column `overall_drink_rating` on the `Pub` table. All the data in the column will be lost.
  - You are about to drop the column `overall_food_rating` on the `Pub` table. All the data in the column will be lost.
  - You are about to drop the column `overall_rating` on the `Pub` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Pub" DROP COLUMN "overall_drink_rating",
DROP COLUMN "overall_food_rating",
DROP COLUMN "overall_rating";
