/*
  Warnings:

  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "carteproduct" DROP CONSTRAINT "carteproduct_cartId_fkey";

-- DropForeignKey
ALTER TABLE "carteproduct" DROP CONSTRAINT "carteproduct_productId_fkey";

-- DropTable
DROP TABLE "Product";
