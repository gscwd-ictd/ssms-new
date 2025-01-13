CREATE TYPE "public"."status" AS ENUM('open', 'closed', 'ongoing', 'cancelled', 'resolved');--> statement-breakpoint
ALTER TABLE "tickets" RENAME COLUMN "user_id" TO "requestor_id";--> statement-breakpoint
ALTER TABLE "tickets" DROP CONSTRAINT "tickets_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "tickets" ADD COLUMN "assigned_id" text;--> statement-breakpoint
ALTER TABLE "tickets" ADD COLUMN "status" "status" DEFAULT 'open' NOT NULL;--> statement-breakpoint
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_requestor_id_user_id_fk" FOREIGN KEY ("requestor_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_assigned_id_user_id_fk" FOREIGN KEY ("assigned_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;