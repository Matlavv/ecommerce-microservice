/*
  Warnings:

  - You are about to drop the column `tag` on the `Product` table. All the data in the column will be lost.
  - The `licences` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "tag",
ADD COLUMN     "tags" TEXT[],
DROP COLUMN "licences",
ADD COLUMN     "licences" TEXT[];
