/*
  Warnings:

  - You are about to drop the column `created_at` on the `transactions` table. All the data in the column will be lost.
  - Added the required column `date` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "created_at",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;
