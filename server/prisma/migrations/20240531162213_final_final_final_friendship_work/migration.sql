-- AlterTable
ALTER TABLE "friendships" ADD CONSTRAINT "friendships_pkey" PRIMARY KEY ("inviter_id", "accepter_id");
