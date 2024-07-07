/*
  Warnings:

  - The values [REQUEST_ABORTED] on the enum `FriendshipStatuses` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `interface_languages` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `interface_themes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `settings` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "FriendshipStatuses_new" AS ENUM ('REQUEST_SENT', 'REQUEST_ACCEPTED');
ALTER TABLE "friendships" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "friendships" ALTER COLUMN "status" TYPE "FriendshipStatuses_new" USING ("status"::text::"FriendshipStatuses_new");
ALTER TYPE "FriendshipStatuses" RENAME TO "FriendshipStatuses_old";
ALTER TYPE "FriendshipStatuses_new" RENAME TO "FriendshipStatuses";
DROP TYPE "FriendshipStatuses_old";
ALTER TABLE "friendships" ALTER COLUMN "status" SET DEFAULT 'REQUEST_SENT';
COMMIT;

-- DropForeignKey
ALTER TABLE "settings" DROP CONSTRAINT "settings_language_id_fkey";

-- DropForeignKey
ALTER TABLE "settings" DROP CONSTRAINT "settings_theme_id_fkey";

-- DropForeignKey
ALTER TABLE "settings" DROP CONSTRAINT "settings_user_id_fkey";

-- DropTable
DROP TABLE "interface_languages";

-- DropTable
DROP TABLE "interface_themes";

-- DropTable
DROP TABLE "settings";

-- CreateTable
CREATE TABLE "messages" (
    "id" SERIAL NOT NULL,
    "sender_id" INTEGER NOT NULL,
    "recipient_id" INTEGER NOT NULL,
    "text" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "message_files" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "message_id" INTEGER NOT NULL,

    CONSTRAINT "message_files_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_recipient_id_fkey" FOREIGN KEY ("recipient_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message_files" ADD CONSTRAINT "message_files_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES "messages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
