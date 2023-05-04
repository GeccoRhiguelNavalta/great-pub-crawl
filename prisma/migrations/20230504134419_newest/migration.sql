/*
  Warnings:

  - You are about to drop the column `authorId` on the `Pub` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `Pub` table. All the data in the column will be lost.
  - Added the required column `overall_drink_rating` to the `Pub` table without a default value. This is not possible if the table is not empty.
  - Added the required column `overall_food_rating` to the `Pub` table without a default value. This is not possible if the table is not empty.
  - Added the required column `overall_rating` to the `Pub` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Pub" DROP CONSTRAINT "Pub_authorId_fkey";

-- AlterTable
ALTER TABLE "Pub" DROP COLUMN "authorId",
DROP COLUMN "rating",
ADD COLUMN     "overall_drink_rating" INTEGER NOT NULL,
ADD COLUMN     "overall_food_rating" INTEGER NOT NULL,
ADD COLUMN     "overall_rating" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "food_rating" INTEGER NOT NULL,
    "drink_rating" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "pubId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_pubsByUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_pubsByUser_AB_unique" ON "_pubsByUser"("A", "B");

-- CreateIndex
CREATE INDEX "_pubsByUser_B_index" ON "_pubsByUser"("B");

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_pubId_fkey" FOREIGN KEY ("pubId") REFERENCES "Pub"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_pubsByUser" ADD CONSTRAINT "_pubsByUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Pub"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_pubsByUser" ADD CONSTRAINT "_pubsByUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
