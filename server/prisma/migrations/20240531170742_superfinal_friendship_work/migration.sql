-- AlterEnum
ALTER TYPE "FriendshipStatuses" ADD VALUE 'REQUEST_ABORTED';

-- AlterTable
ALTER TABLE "friendships" ALTER COLUMN "status" DROP DEFAULT;
