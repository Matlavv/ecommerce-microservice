/*
  Warnings:

  - You are about to drop the column `content` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "content",
DROP COLUMN "title",
ADD COLUMN     "category" TEXT,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "image_url" TEXT,
ADD COLUMN     "licences" TEXT,
ADD COLUMN     "name" VARCHAR(255) NOT NULL DEFAULT 'Product',
ADD COLUMN     "price" INTEGER,
ADD COLUMN     "reference" TEXT,
ADD COLUMN     "stock_quantity" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "tag" TEXT;
