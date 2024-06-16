/*
  Warnings:

  - The primary key for the `friendships` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `friendships` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "friendships" DROP CONSTRAINT "friendships_pkey",
DROP COLUMN "id";
