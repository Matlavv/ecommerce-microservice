/*
  Warnings:

  - A unique constraint covering the columns `[cartId,productId]` on the table `carteproduct` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "carteproduct_cartId_productId_key" ON "carteproduct"("cartId", "productId");
