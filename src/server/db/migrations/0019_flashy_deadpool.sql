ALTER TABLE "teams" DROP CONSTRAINT "teams_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "teams" DROP COLUMN "user_id";