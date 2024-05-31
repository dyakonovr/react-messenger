-- This is an empty migration.
ALTER TABLE "_friends" RENAME COLUMN "A" TO "user_id";
ALTER TABLE "_friends" RENAME COLUMN "B" TO "friend_id";
ALTER TABLE "_friends" RENAME TO "friends";