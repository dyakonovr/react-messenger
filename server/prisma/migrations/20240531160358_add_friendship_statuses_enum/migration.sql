/*
  Warnings:

  - You are about to drop the `friendship_statuses` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `status` to the `friendships` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "FriendshipStatuses" AS ENUM ('REQUEST_SENT', 'REQUEST_ACCEPTED');

-- DropForeignKey
ALTER TABLE "friendships" DROP CONSTRAINT "friendships_status_id_fkey";

-- AlterTable
ALTER TABLE "friendships" ADD COLUMN     "status" "FriendshipStatuses" NOT NULL;

-- DropTable
DROP TABLE "friendship_statuses";
