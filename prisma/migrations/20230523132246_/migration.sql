/*
  Warnings:

  - You are about to drop the `_pubsByUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_pubsByUser" DROP CONSTRAINT "_pubsByUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_pubsByUser" DROP CONSTRAINT "_pubsByUser_B_fkey";

-- DropTable
DROP TABLE "_pubsByUser";

-- CreateTable
CREATE TABLE "_visitors" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_visitors_AB_unique" ON "_visitors"("A", "B");

-- CreateIndex
CREATE INDEX "_visitors_B_index" ON "_visitors"("B");

-- AddForeignKey
ALTER TABLE "_visitors" ADD CONSTRAINT "_visitors_A_fkey" FOREIGN KEY ("A") REFERENCES "Pub"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_visitors" ADD CONSTRAINT "_visitors_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
