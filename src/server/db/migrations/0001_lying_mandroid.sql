CREATE TYPE "public"."roles" AS ENUM('support', 'user');--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "role" "roles" DEFAULT 'user';