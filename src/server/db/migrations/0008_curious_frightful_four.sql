ALTER TABLE "tickets" ADD COLUMN "cancelled_due_to" text;--> statement-breakpoint
ALTER TABLE "tickets" ADD COLUMN "started_at" timestamp;--> statement-breakpoint
ALTER TABLE "tickets" ADD COLUMN "resolved_at" timestamp;--> statement-breakpoint
ALTER TABLE "tickets" ADD COLUMN "cancelled_at" timestamp;