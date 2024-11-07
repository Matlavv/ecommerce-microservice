/*
  Warnings:

  - You are about to drop the `CartProduct` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `stock` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CartProduct" DROP CONSTRAINT "CartProduct_cartId_fkey";

-- DropForeignKey
ALTER TABLE "CartProduct" DROP CONSTRAINT "CartProduct_productId_fkey";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "stock" INTEGER NOT NULL;

-- DropTable
DROP TABLE "CartProduct";

-- CreateTable
CREATE TABLE "carteproduct" (
    "id" SERIAL NOT NULL,
    "cartId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "carteproduct_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "carteproduct" ADD CONSTRAINT "carteproduct_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carteproduct" ADD CONSTRAINT "carteproduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
