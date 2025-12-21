/*
  Warnings:

  - You are about to drop the column `image_url` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `sellerId` on the `Product` table. All the data in the column will be lost.
  - Added the required column `imageUrl` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_sellerId_fkey";

-- DropIndex
DROP INDEX "Product_sellerId_idx";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "image_url",
DROP COLUMN "sellerId",
ADD COLUMN     "imageUrl" TEXT NOT NULL;
